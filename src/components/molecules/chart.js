import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

import { Grid } from '@material-ui/core';

export default function Chart({ balances, showInvestChart }) {
  let [data, setData] = useState({});
  let [options, setOptions] = useState({
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true
        }
      }],
    }
  });

  const investData = {
    labels: [
      'Banco Safra S.A.',
      'Nubank',
      'Santander'
    ],
    datasets: [{
      data: [16000, 6000, 3000],
      backgroundColor: [
        'rgba(100,140,180,0.8)',
        'rgba(100,100,120,0.8)',
        'rgba(160,80,120,0.8)',
      ],
      hoverBackgroundColor: [
        'rgba(100,140,180,1)',
        'rgba(100,100,120,1)',
        'rgba(160,80,120,1)',
      ]
    }],
  }

  const investOptions = {
    legend: {
      position: 'right',
    },
    layout: {
      padding: {
        top: 20,
      }
    }

  };

  const setChartData = () => {
    // const labels = [1, 1, 1, 2, 2];
    // const data = [1, 2, 3, 4, 5];
    const labels = balances.map(bal => bal.bank_name)
    const data = balances.map(bal => parseInt(bal.account_amount))

    const dataChart = {
      labels,
      datasets: [
        {
          label: 'Saldo (R$)',
          backgroundColor: 'rgba(100,100,120,0.8)',
          // borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          data,
          maxBarThickness: 80,
        }
      ]
    };

    setData(dataChart);
  }

  useEffect(() => {
    console.log('sa')
    if (!showInvestChart) {
      setChartData();
    }
  }, [balances, showInvestChart])

  return (
    <>
      <Grid container style={{ marginBottom: 8 }}>
        {showInvestChart
          ? <Doughnut
            data={investData}
            options={investOptions}
            width={350}
            height={120}
          />
          : <Bar
            data={data}
            width={350}
            height={300}
            style={{ padding: 20 }}
            options={options}
          />
        }

      </Grid>
    </>
  );
}
