import React, { useState, useContext, ChangeEvent } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import * as Papa from 'papaparse';
import { BASE_URL } from '../config';
import { UserContext } from '../UserContext'; // Adjust the import path as necessary

// Define types for row data
interface RowData {
  DATA: string;
  'ORARIO ENTRATA': string;
  'ORARIO USCITA': string;
  NOTE?: string;
  FERIE?: string;
  MALATTIA?: string;
}

const FileUploader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(UserContext);
  var batchNumber = 0;

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const userId = user.userId;

    setLoading(true);
    setError(null);

    const file = event.target.files?.[0];
    if (!file) {
      setError('No file selected.');
      setLoading(false);
      return;
    }

    try {
      const csvText = await file.text();
      const dataToSend: any[] = [];

      Papa.parse<RowData>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: async (parsedData) => {
          parsedData.data.forEach(row => {
            try {
              const note = (row['NOTE'] || '').replace(/\r?\n|\r/g, ' ').trim();
              const isFerie = row['ORARIO ENTRATA'].toUpperCase().trim() === 'FERIE';
              const isMalattia = row['ORARIO ENTRATA'].toUpperCase().trim().includes('MALATTIA');
              const specialDay = isFerie ? 'Ferie' : isMalattia ? 'Malattia' : '';

              const date = parseDate(row['DATA']);
              if (!date) {
                console.error(`Invalid date: ${row['DATA']}. Skipping row.`);
                return;
              }

              let startTimeDate: string | null = null, endTimeDate: string | null = null;
              if (specialDay) {
                startTimeDate = date.startOf('day').toISO();
                endTimeDate = date.endOf('day').toISO();
              } else {
                const startTime = formatTime(row['ORARIO ENTRATA']);
                const endTime = formatTime(row['ORARIO USCITA']);

                if (startTime) {
                  startTimeDate = date.set({
                    hour: parseInt(startTime.split(':')[0]),
                    minute: parseInt(startTime.split(':')[1]),
                    second: parseInt(startTime.split(':')[2] || '00')
                  }).toISO();
                } else {
                  console.error(`Invalid start time: ${row['ORARIO ENTRATA']}`);
                  return;
                }

                if (endTime) {
                  endTimeDate = date.set({
                    hour: parseInt(endTime.split(':')[0]),
                    minute: parseInt(endTime.split(':')[1]),
                    second: parseInt(endTime.split(':')[2] || '00')
                  }).toISO();
                } else {
                  console.error(`Invalid end time: ${row['ORARIO USCITA']}`);
                  return;
                }
              }

              if (endTimeDate && startTimeDate && DateTime.fromISO(endTimeDate) < DateTime.fromISO(startTimeDate)) {
                endTimeDate = DateTime.fromISO(endTimeDate).plus({ days: 1 }).toISO();
              }

              dataToSend.push({
                userId,
                date: date.toISODate(),
                ingress: startTimeDate,
                outgress: endTimeDate,
                specialDay,
                note
              });
            } catch (error) {
              console.error(`Failed to process row: ${JSON.stringify(row)}\n`, error);
            }
          });

          // Send data in batches of 100
          if (dataToSend.length > 0) {
            try {
              for (let i = 0; i < dataToSend.length; i += 100) {
                const batch = dataToSend.slice(i, i + 100);
                // console.log('bout to send batch number ', batchNumber);
                batchNumber++;
                await axios.post(`${BASE_URL}/api/dailydata/batch`, batch);
                // console.log(`Successfully sent batch: ${JSON.stringify(batch)}`);
              }
            } catch (error) {
              console.error('Error sending data in batch:', error);
              setError('An error occurred while sending data.');
            }
          }
        }
      });
    } catch (error) {
      console.error('Error processing the file:', error);
      setError('An error occurred while processing the file.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeStr: string): string | null => {
    if (!timeStr || timeStr.trim() === '') return null;
    if (timeStr.includes('.')) {
      const [hours, minutes, seconds = '00'] = timeStr.split('.');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return timeStr;
  };

  const parseDate = (dateStr: string): DateTime | null => {
    const [day, month, year] = dateStr.split('/');
    const date = DateTime.fromObject({ year: parseInt(year), month: parseInt(month), day: parseInt(day) }, { zone: 'Europe/Rome' });
    return date.isValid ? date : null;
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload} 
        disabled={loading} 
      />
      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUploader;
