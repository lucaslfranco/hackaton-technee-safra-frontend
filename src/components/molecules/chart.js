import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Grid } from '@material-ui/core';

export default function Chart(props) {
  // Configurações e estilização do gráfico, contendo também os dados
  let [options, setOptions] = useState({});
  let [settings, setSettings] = useState({});
  let [data, setData] = useState({});

  const setChartData = () => {
    // const labels = [...new Set(projects.map(proj => proj.status))].sort((a, b) => a - b);
    const labels = [1, 1, 1, 2, 2]
    const data = [1, 2, 3, 4, 5];

    // projects.forEach(row => {
    //   const position = labels.indexOf(row.status);
    //   if (position !== -1)
    //     data[position] = data[position] !== undefined ? data[position] + 1 : 1;
    // });

    const dataChart = {
      labels,
      datasets: [
        {
          label: 'Saldo x Instituição',
          backgroundColor: 'rgba(100,100,120,0.8)',
          // borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          backgroundColor: 'rgba(100,100,120,0.8)',
          backgroundColor: 'rgba(100,100,120,0.8)',
          data,
        }
      ]
    };

    setData(dataChart);
  }

  useEffect(() => {
    setChartData();
  }, [])

  // Renderização do gráfico na tela 
  return (
    <>
      <Grid container style={{ marginBottom: 8 }}>
        <Bar
          data={data}
          width={350}
          height={300}
          style={{ padding: 20 }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  display: true
                }
              }],
            }
          }}
        />
      </Grid>
    </>
  );
}
