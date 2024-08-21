import { FunctionComponent, useState, useContext, useEffect } from "react";
import styles from "./InsertData.module.css";
import axios from "axios"; // Assuming you're using Axios for HTTP requests
import { UserContext } from "../UserContext"; // Import your UserContext
import { BASE_URL } from '../config';

const InsertData: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [specialDay, setSpecialDay] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
  
    const handleSpecialDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSpecialDay(event.target.value);
    };
  
    const isSpecialDaySelected = specialDay === "Ferie" || specialDay === "Malattia" || specialDay === "Permesso";
  
    useEffect(() => {
      const fetchStartTime = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/dailydata/${user.userId}/${date}`);
          
          if (response.data) {
            // Handle ingress (start time)
            if (response.data.ingress) {
              // Convert to local time without altering it to UTC
              const startTimeFromDb = new Date(response.data.ingress).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
              setStartTime(startTimeFromDb);
            } else if (response.data.specialDay) {
              // Handle special day (Ferie, Malattia, Permesso)
              setSpecialDay(response.data.specialDay); 
              setStartTime(''); 
            } else {
              setStartTime(''); // Default to empty if no ingress and no special day
            }
    
            // Handle outgress (end time)
            if (response.data.outgress) {
              const endTimeFromDb = new Date(response.data.outgress).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
              setEndTime(endTimeFromDb);
            } else {
              setEndTime(''); // Default to empty if no outgress
            }
    
            // Handle notes
            if (response.data.note) {
              setNotes(response.data.note); 
            }
          }
        } catch (error) {
          console.error("Error fetching start time:", error);
        }
      };
    
      fetchStartTime();
    }, [date, user.userId]);
    
    
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      let clearedStartTime = startTime;
      let clearedEndTime = endTime;
  
      if (isSpecialDaySelected) {
        clearedStartTime = "00:00";
        clearedEndTime = "00:00";
      }
  
      const startTimeDate = new Date(`${date}T${clearedStartTime}`);
      let endTimeDate = endTime ? new Date(`${date}T${clearedEndTime}`) : null;
  
      if (endTimeDate && endTimeDate < startTimeDate) {
        endTimeDate.setDate(endTimeDate.getDate() + 1);
      }
  
      try {
        await axios.post(`${BASE_URL}/api/dailydata`, {
          userId: user.userId,
          date,
          ingress: startTimeDate,
          outgress: endTimeDate,
          specialDay,
          note: notes
        });
  
        setDate(new Date().toISOString().split("T")[0]);
        setStartTime("");
        setEndTime("");
        setSpecialDay("");
        setNotes("");
        alert("Data inserted successfully!");
      } catch (error) {
        console.error("Error inserting data:", error);
        alert("Failed to insert data. Please try again.");
      }
    };
  return (
    <div className={styles.insertdata}>
      <section className={styles.insertform}>
        <div className={styles.insertformInner}>
          <div className={styles.inserisciUnaNuovaGiornataWrapper}>
            <h1 className={styles.inserisciUnaNuova}>Inserisci una nuova giornata</h1>
          </div>
        </div>
        <div className={styles.formData}>
          <form className={styles.dataInput} onSubmit={handleSubmit}>
            <div className={styles.name}>
              <div className={styles.dataFieldLabels}>
                <div className={styles.data}>Data</div>
              </div>
              <div className={styles.name1}>
                <div className={styles.inputfieldtext}>
                  <input
                    className={styles.inserisciLaData}
                    type="date"
                    value={date}
                    max={new Date().toISOString().split('T')[0]} // Add this line
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.name2}>
              <div className={styles.oraIngressoWrapper}>
                <div className={styles.oraIngresso}>Ora Ingresso</div>
              </div>
              <div className={styles.name1}>
                <div className={styles.inputfieldtext1}>
                  <input
                    className={styles.ora}
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={isSpecialDaySelected}
                  />
                </div>
              </div>
            </div>
            <div className={styles.name4}>
              <div className={styles.oraIngressoContainer}>
                <div className={styles.oraIngresso1}>Ora Uscita</div>
              </div>
              <div className={styles.name1}>
                <div className={styles.inputfieldtext2}>
                  <input
                    className={styles.ora1}
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={isSpecialDaySelected}
                  />
                </div>
              </div>
            </div>
            <div className={styles.name4}>
              <div className={styles.giornataSpecialeWrapper}>
                <div className={styles.giornataSpeciale}>Giornata Speciale</div>
              </div>
              <div className={styles.name7}>
                <div className={styles.inputfieldtext3}>
                  <select
                    className={styles.selezionaLaScelta}
                    value={specialDay}
                    onChange={handleSpecialDayChange}
                  >
                    <option value="">None</option>
                    <option value="Ferie">Ferie</option>
                    <option value="Malattia">Malattia</option>
                    <option value="Permesso">Permesso</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.name8}>
              <div className={styles.noteWrapper}>
                <div className={styles.note}>Note*</div>
              </div>
              <div className={styles.name9}>
                <div className={styles.inputfieldtext4}>
                  <input
                    className={styles.inserisciUnaNota}
                    placeholder="Inserisci una nota"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formButtons}>
              <div className={styles.submitButton}>
                <button className={styles.buttonbase} type="submit">
                  <b className={styles.buttonLabels}>Inserisci</b>
                </button>
                <button
                  className={styles.buttonbase1}
                  type="reset"
                  onClick={() => {
                    setDate(new Date().toISOString().split("T")[0]);
                    setStartTime("");
                    setEndTime("");
                    setSpecialDay("");
                    setNotes("");
                  }}
                >
                  <b className={styles.text1}>Reset</b>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InsertData;

