import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getUserSummary } from '../../api/usersApi';
import {
  ProfileChartTypes,
  formatUserSummaryData,
  formatUserSummaryOptions,
} from '../../services/userService';
import styles from './ProfileChart.module.css';

function ProfileChart({
  username,
  dateType,
  valueType,
  profileChartType = ProfileChartTypes.lineChart,
}) {
  const [userSummary, setUserSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reloadUserSummary();
  }, [username, dateType]);

  async function reloadUserSummary() {
    try {
      setIsLoading(true);
      const userSummary = (await getUserSummary(username, dateType)).data;
      setUserSummary(userSummary);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const data = formatUserSummaryData(userSummary, dateType, valueType);
  const options = formatUserSummaryOptions(
    profileChartType,
    dateType,
    valueType
  );

  return (
    <div className={styles.container}>
      <Chart
        chartType={profileChartType}
        width="100%"
        data={data}
        options={options}
      />
    </div>
  );
}

export default ProfileChart;
