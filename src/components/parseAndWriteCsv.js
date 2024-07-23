const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');
const mongoose = require('mongoose');

// Define the input and output file paths
const inputFilePath = './tabella.csv';
const outputFilePath = './tabellaparsed.csv';

// Define the CSV writer for the output file
const csvWriter = createObjectCsvWriter({
    path: outputFilePath,
    header: [
        { id: 'userId', title: 'userId' },
        { id: 'date', title: 'DATE' },
        { id: 'ingress', title: 'INGRESS' },
        { id: 'outgress', title: 'OUTGRESS' },
        { id: 'specialDay', title: 'SPECIAL DAY' },
        { id: 'note', title: 'NOTE' },
        { id: 'straordinarioFeriale', title: 'STRAORDINARIO FERIALE' },
        { id: 'straordinarioFestivo', title: 'STRAORDINARIO FESTIVO' },
        { id: 'ferie', title: 'FERIE' },
        { id: 'permesso', title: 'PERMESSO' },
    ]
});

async function parseAndWriteCsv() {
    const results = [];

    fs.createReadStream(inputFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // Determine if it's a ferie or malattia
            const isFerie = row['FERIE'] === '1' || row['ORARIO ENTRATA'].toLowerCase().includes('ferie');
            const isMalattia = row['MALATTIA'] === '1' || row['ORARIO ENTRATA'].toLowerCase().includes('malattia');
            const specialDay = isFerie ? 'Ferie' : isMalattia ? 'Malattia' : '';

            // Convert date and time fields to Date objects
            const dateParts = row['DATA'].split('/');
            const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

            let ingress, outgress;
            if (specialDay) {
                ingress = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T00:00:00`);
                outgress = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T00:00:00`);
            } else {
                ingress = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${row['ORARIO ENTRATA']}:00`);
                outgress = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${row['ORARIO USCITA']}:00`);
            }

            // Transform the row data into the desired format
            const data = {
                userId: "", // Replace with actual userId
                date,
                ingress,
                outgress,
                specialDay,
                note: row['NOTE'],
                straordinarioFeriale: 0, // Default value
                straordinarioFestivo: 0, // Default value
                ferie: isFerie,
                permesso: 0 // Default value
            };

            // Push transformed data to results array
            results.push(data);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');

            // Write the transformed data to a new CSV file
            await csvWriter.writeRecords(results);
            console.log('Data successfully written to new CSV file');
        });
}

// Run the function
parseAndWriteCsv();
