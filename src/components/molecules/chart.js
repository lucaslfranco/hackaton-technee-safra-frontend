import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

import { Grid } from '@material-ui/core';

export default function Chart({ balances, currency, showInvestChart }) {
  let [data, setData] = useState({});
  let options = {
    // maintainAspectRatio: false,
    legend: {
      position: 'right',
    },
    layout: {
      padding: {
        top: 20,
      }
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function (tooltipItem, data) {
          var dataset = data['datasets'][0];
          const metaIndex = Object.keys(dataset['_meta'])[0];
          var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][metaIndex]['total']) * 100)
          return ` ${currency} ${dataset['data'][tooltipItem['index']]} (${percent}%)`;
        },
        // afterLabel: function (tooltipItem, data) {
        // }
      }
    },
    // scales: {
    //   xAxes: [{
    //     gridLines: {
    //       display: false
    //     }
    //   }],
    //   yAxes: [{
    //     gridLines: {
    //       display: false
    //     },
    //     ticks: {
    //       beginAtZero: false
    //     }
    //   }],
    // }
  };

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
          borderWidth: 1,
          data,
          maxBarThickness: 80,
        }
      ]
    };

    setData(dataChart);
  }

  useEffect(() => {
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
            options={options}
            width={350}
            height={120}
          />
          : <Doughnut
            data={data}
            options={options}
            width={350}
            height={120}
          />
        }

      </Grid>
    </>
  );
}
