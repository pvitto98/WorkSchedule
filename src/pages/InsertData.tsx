// src/components/InsertData.tsx
import { FunctionComponent, useState, useContext, useEffect } from "react";
import styles from "./InsertData.module.css";
import axios from "axios";
import { UserContext } from "../UserContext";
import { BASE_URL } from '../config';
import { useTranslation } from 'react-i18next';
import '../components/i19n';

const InsertData: FunctionComponent = () => {
    const { t } = useTranslation();
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
                    if (response.data.ingress) {
                        const startTimeFromDb = new Date(response.data.ingress).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                        setStartTime(startTimeFromDb);
                    } else if (response.data.specialDay) {
                        setSpecialDay(response.data.specialDay);
                        setStartTime('');
                    } else {
                        setStartTime('');
                    }

                    if (response.data.outgress) {
                        const endTimeFromDb = new Date(response.data.outgress).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                        setEndTime(endTimeFromDb);
                    } else {
                        setEndTime('');
                    }

                    if (response.data.note) {
                        setNotes(response.data.note);
                    }
                }
            } catch (error) {
                console.error(t('fetchTimeError'), error);
            }
        };

        fetchStartTime();
    }, [date, user.userId, t]);

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
            alert(t('dataInsertSuccess'));
        } catch (error) {
            console.error(t('dataInsertError'), error);
            alert(t('dataInsertFailure'));
        }
    };

    return (
        <div className={styles.insertdata}>
            <section className={styles.insertform}>
                <div className={styles.insertformInner}>
                    <div className={styles.inserisciUnaNuovaGiornataWrapper}>
                        <h1 className={styles.inserisciUnaNuova}>{t('insertNewDay')}</h1>
                    </div>
                </div>
                <div className={styles.formData}>
                    <form className={styles.dataInput} onSubmit={handleSubmit}>
                        <div className={styles.name}>
                            <div className={styles.dataFieldLabels}>
                                <div className={styles.data}>{t('date')}</div>
                            </div>
                            <div className={styles.name1}>
                                <div className={styles.inputfieldtext}>
                                    <input
                                        className={styles.inserisciLaData}
                                        type="date"
                                        value={date}
                                        max={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.name2}>
                            <div className={styles.oraIngressoWrapper}>
                                <div className={styles.oraIngresso}>{t('entryTime')}</div>
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
                                <div className={styles.oraIngresso1}>{t('exitTime')}</div>
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
                                <div className={styles.giornataSpeciale}>{t('specialDay')}</div>
                            </div>
                            <div className={styles.name7}>
                                <div className={styles.inputfieldtext3}>
                                    <select
                                        className={styles.selezionaLaScelta}
                                        value={specialDay}
                                        onChange={handleSpecialDayChange}
                                    >
                                        <option value="">{t('none')}</option>
                                        <option value="Ferie">{t('holiday')}</option>
                                        <option value="Malattia">{t('sick')}</option>
                                        <option value="Permesso">{t('leave')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.name8}>
                            <div className={styles.noteWrapper}>
                                <div className={styles.note}>{t('notes')}*</div>
                            </div>
                            <div className={styles.name9}>
                                <div className={styles.inputfieldtext4}>
                                    <input
                                        className={styles.inserisciUnaNota}
                                        placeholder={t('notePlaceholder')}
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
                                    <b className={styles.buttonLabels}>{t('submit')}</b>
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
                                    <b className={styles.text1}>{t('reset')}</b>
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
