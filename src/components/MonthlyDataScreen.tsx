import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import styles from "./MonthlyDataScreen.module.css";
import axios from "axios"; // Assuming you're using Axios for HTTP requests
import { UserContext } from "../UserContext"; // Import your UserContext
import { BASE_URL } from '../config';
import { FaTrash } from 'react-icons/fa'; // Importing trash icon from react-icons

const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

// Helper function to get the Italian month name
const getItalianMonthName = (monthIndex: number) => {
    return months[monthIndex];
};

const MonthlyDataScreen: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const currentMonthIndex = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [dailyData, setDailyData] = useState([] as any[]);
    const [availableYears, setAvailableYears] = useState<string[]>([new Date().getFullYear().toString()]);

    // Fetch available years for the user
    const fetchAvailableYears = async () => {
        try {
            const userId = user.userId;
            const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`); // Correct endpoint
            if (response.status === 200) {
                const years = response.data.years.sort((a: number, b: number) => b - a)
                setAvailableYears(years);
                // Set the selected year to the most recent year by default
                setSelectedYear(years[0]);
            }
        } catch (error) {
            console.error("Failed to fetch available years", error);
        }
    };


    // Fetch available years on mount
    useEffect(() => {
        if (user.userId) {
            fetchAvailableYears();
        }
    }, [user.userId]);


    const fetchDailyData = async (month: number, year: number) => {
        try {
            const userId = user.userId; // Assuming user is defined somewhere in your component
            const response = await axios.get(`${BASE_URL}/api/dailydata/${userId}/${year}/${month + 1}`);

            if (response.status === 200) {
                setDailyData(response.data);
            } else {
                setDailyData([]);
            }
        } catch (error) {
            console.error("Failed to fetch daily data", error);
            setDailyData([]);
        }
    };

    useEffect(() => {
        if (user.userId) {
            fetchDailyData(selectedMonth, selectedYear);
        }
    }, [selectedMonth, selectedYear, user.userId]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${BASE_URL}/api/dailydata/${id}`);
            setDailyData(dailyData.filter(data => data._id !== id));
        } catch (error) {
            console.error("Failed to delete daily data", error);
        }
    };

    return (
        <div className={styles.monthlyDataScreen}>
            <div className={styles.selector}>
                <div>
                    <label>Mese:</label>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Anno:</label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <table className={styles.dataTable}>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Ora Ingresso</th>
                        <th>Ora Uscita</th>
                        <th>Giornata Speciale</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((data: any) => (
                        <tr key={data._id}>
                            <td>{new Date(data.date).toLocaleDateString('en-GB')}</td>
                            <td>{!data.specialDay && (new Date(data.ingress).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }))}</td>
                            <td>{!data.specialDay && (new Date(data.outgress).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }))}</td>
                            <td>{data.specialDay}</td>
                            <td>{data.note}</td>
                            <td>
                                <button onClick={() => handleDelete(data._id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthlyDataScreen;
