import React, { FunctionComponent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import styles from "./FestiveDays.module.css";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../config";

const FestiveDays: FunctionComponent = () => {
  const [festiveDays, setFestiveDays] = useState<number[]>([]);
  const [hours, setHours] = useState<number | "">("");  // Allow empty state
  const [minutes, setMinutes] = useState<number | "">("");  // Allow empty state
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const daysOfWeek = [
    { label: "Lunedì", value: 1 },
    { label: "Martedì", value: 2 },
    { label: "Mercoledì", value: 3 },
    { label: "Giovedì", value: 4 },
    { label: "Venerdì", value: 5 },
    { label: "Sabato", value: 6 },
    { label: "Domenica", value: 0 },
  ];

  const handleCheckboxChange = (day: number) => {
    setFestiveDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setHours(value ? Number(value) : "");
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setMinutes(value ? Number(value) : "");
  };

  const handleSubmit = async () => {
    if (festiveDays.length === 0 || hours === "" || minutes === "") {
      alert("Tutti i campi sono obbligatori. Assicurati di selezionare almeno un giorno festivo e di inserire le ore e i minuti.");
      return;
    }

    setLoading(true);
    try {
      const workingHoursInMinutes = Number(hours) * 60 + Number(minutes);

      const response = await axios.put(`${BASE_URL}/auth/users/${user.userId}/festive`, {
        festiveDays,
        workingHours: workingHoursInMinutes,
      });

      navigate("/login");
    } catch (error) {
      console.error("Failed to save festive days:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.festiveDays}>
      {loading && <Spinner />}
      <section className={styles.content}>
        <h1 className={styles.title}>Quali giorni sono considerati straordinari?</h1>
        <div className={styles.form}>
          <div className={styles.daySelection}>
            {daysOfWeek.map((day) => (
              <label key={day.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={day.value}
                  onChange={() => handleCheckboxChange(day.value)}
                  checked={festiveDays.includes(day.value)}
                />
                {day.label}
              </label>
            ))}
          </div>
          <div className={styles.hoursInput}>
            <h1 className={styles.title}>Quante ore sono considerate festive?</h1>
            <div className={styles.dropdownContainer}>
              <select
                value={hours}
                onChange={handleHoursChange}
                className={styles.dropdown}
              >
                <option value="">--</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <select
                value={minutes}
                onChange={handleMinutesChange}
                className={styles.dropdown}
              >
                <option value="">--</option>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Salva
          </button>
        </div>
      </section>
    </div>
  );
};

export default FestiveDays;
