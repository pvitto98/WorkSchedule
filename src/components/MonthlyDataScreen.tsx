// src/components/MonthlyDataScreen.tsx
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import styles from "./MonthlyDataScreen.module.css";
import axios from "axios";
import { UserContext } from "../UserContext";
import { BASE_URL } from '../config';
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './i19n';  // This line should be added to ensure i18n configuration is loaded

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MonthlyDataScreen: FunctionComponent = () => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const currentMonthIndex = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [dailyData, setDailyData] = useState([] as any[]);
    const [availableYears, setAvailableYears] = useState<string[]>([currentYear.toString()]);

    const fetchAvailableYears = async () => {
        try {
            const userId = user.userId;
            const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`);
            if (response.status === 200) {
                const years = response.data.years.sort((a: number, b: number) => b - a);
                setAvailableYears(years);
                setSelectedYear(years[0]);
            }
        } catch (error) {
            console.error(t('fetchYearsError'), error);
        }
    };

    useEffect(() => {
        if (user.userId) {
            fetchAvailableYears();
        }
    }, [user.userId]);

    const fetchDailyData = async (month: number, year: number) => {
        try {
            const userId = user.userId;
            const response = await axios.get(`${BASE_URL}/api/dailydata/${userId}/${year}/${month + 1}`);
            if (response.status === 200) {
                setDailyData(response.data);
            } else {
                setDailyData([]);
            }
        } catch (error) {
            console.error(t('fetchDataError'), error);
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
            console.error(t('deleteError'), error);
        }
    };

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${Math.floor(mins)}m`;
      };

    return (
        <div className={styles.monthlyDataScreen}>
            <div className={styles.selector}>
                <div>
                    <label>{t('month')}:</label>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>{t('year')}:</label>
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
                        <th>{t('date')}</th>
                        <th>{t('entryTime')}</th>
                        <th>{t('exitTime')}</th>
                        <th>{t('overtime')}</th>
                        <th>{t('leave')}</th>
                        <th>{t('specialDay')}</th>
                        <th>{t('notes')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((data: any) => (
                        <tr key={data._id}>
                            <td>{new Date(data.date).toLocaleDateString('en-GB')}</td>
                            <td>{!data.specialDay && (new Date(data.ingress).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }))}</td>
                            <td>{!data.specialDay && (new Date(data.outgress).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }))}</td>
                            <td>{formatTime(data.straordinarioFeriale + data.straordinarioFestivo)}</td>
                            <td>{formatTime(data.permesso)}</td>
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
