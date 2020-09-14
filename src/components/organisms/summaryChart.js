import React, { useEffect, useState } from 'react';

import { Chart } from '../';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

import {
  VisibilityOutlined,
  VisibilityOff
} from '@material-ui/icons';

function SummaryChart({ classes, accounts, balances, institution }) {

  const [isBalanceVisible, setBalanceVisible] = useState(true);
  const [isBalance2Visible, setBalance2Visible] = useState(true);

  const [formattedBalances, setFormattedBalances] = useState([]);
  const [filteredBalances, setFilteredBalances] = useState([]);
  const [foreignBalances, setForeignBalances] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalForeignBalance, setTotalForeignBalance] = useState(0);
  const [showInvestChart, setInvestChart] = useState(false);

  useEffect(() => {
    const bankAccounts = accounts.filter(acc => acc.bank_id === institution).map(acc => acc.bank_account);

    let filteredBalances = balances.filter(bal => bal.account_currency === 'BRL');
    let foreignBalances = balances.filter(bal => bal.account_currency === 'GBP');

    // if (institution)
    //   filteredBalances = balances.filter(bal => bankAccounts.includes(bal.account_id));
    const totalBalance = filteredBalances.reduce((a, b) => a + (parseInt(b.account_amount) || 0), 0);
    const totalForeignBalance = foreignBalances.reduce((a, b) => a + (parseInt(b.account_amount) || 0), 0);

    setFilteredBalances(filteredBalances);
    setTotalBalance(totalBalance);

    setForeignBalances(foreignBalances);
    setTotalForeignBalance(totalForeignBalance);
  }, [balances, institution])

  const formatter =
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });

  const formatterGBP =
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    });

  return (
    <Grid container>
      <Grid
        className={`${classes.container} ${classes.homeContainer}`}
        container item xs={12} justify="space-between"
      >
        <Grid item xs={6} style={{ padding: 8 }}>
          <Grid
            item xs={12}
            className={`${classes.indicator} indicatorGold`}
            onClick={() => setInvestChart(false)}
          >
            <Box>
              <Typography component="span" className={classes.indicatorLabel}>Saldo Total</Typography>
              {isBalanceVisible ?
                <VisibilityOff
                  style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                  onClick={() => setBalanceVisible(false)}
                />
                :
                <VisibilityOutlined
                  style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                  onClick={() => setBalanceVisible(true)}
                />
              }
            </Box>
            <Box align="right">
              <Typography component="span" className={classes.indicatorValue}>
                {
                  isBalanceVisible
                    ? formatter.format(totalBalance)
                    : '-'
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={6} style={{ padding: 8 }}>
          <Grid
            item xs={12}
            className={`${classes.indicator} indicatorGold`}
            onClick={() => setInvestChart(true)}
          >
            <Box component="span" className={classes.indicatorLabel}>
              <Typography component="span" className={classes.indicatorLabel}>Investimento Total</Typography>
              {isBalance2Visible ?
                <VisibilityOff
                  style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                  onClick={() => setBalance2Visible(false)}
                />
                :
                <VisibilityOutlined
                  style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                  onClick={() => setBalance2Visible(true)}
                />
              }
            </Box>
            <Typography align="right">
              <Typography component="span" className={classes.indicatorValue}>
                {
                  isBalance2Visible
                    ? formatter.format('25000')
                    : '-'
                }
              </Typography>
            </Typography>
          </Grid>
        </Grid>

        <Chart
          balances={filteredBalances}
          showInvestChart={showInvestChart}
          currency='R$'
        />
      </Grid>

      {foreignBalances.length &&
        <Grid
          className={`${classes.container} ${classes.homeContainer}`}
          container item xs={12} justify="space-between"
          style={{ marginTop: 16 }}
        >
          <Grid item xs={6} style={{ padding: 8 }}>
            <Grid
              item xs={12}
              className={`${classes.indicator} indicatorGold`}
              onClick={() => setInvestChart(false)}
            >
              <Box>
                <Typography
                  component="span" className={classes.indicatorLabel}
                >
                  Saldo Total
                </Typography>
                {isBalanceVisible ?
                  <VisibilityOff
                    style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                    onClick={() => setBalanceVisible(false)}
                  />
                  :
                  <VisibilityOutlined
                    style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                    onClick={() => setBalanceVisible(true)}
                  />
                }
              </Box>
              <Box align="right">
                <Typography component="span" className={classes.indicatorValue}>
                  {
                    isBalanceVisible
                      ? formatterGBP.format(totalForeignBalance)
                      : '-'
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid xs={6} style={{ padding: 8 }}>
            <Grid
              item xs={12}
              className={`${classes.indicator} indicatorGold`}
              onClick={() => setInvestChart(true)}
            >
              <Box
                component="span"
                className={classes.indicatorLabel}
              >
                <Typography
                  component="span" className={classes.indicatorLabel}
                >
                  Investimento Total
                </Typography>
                {isBalance2Visible ?
                  <VisibilityOff
                    style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                    onClick={() => setBalance2Visible(false)}
                  />
                  :
                  <VisibilityOutlined
                    style={{ cursor: 'pointer', marginLeft: 4, marginBottom: -6 }}
                    onClick={() => setBalance2Visible(true)}
                  />
                }
              </Box>
              <Typography align="right">
                <Typography component="span" className={classes.indicatorValue}>
                  {
                    isBalance2Visible
                      ? formatterGBP.format('20000')
                      : '-'
                  }
                </Typography>
              </Typography>
            </Grid>
          </Grid>

          <Chart
            balances={foreignBalances}
            showInvestChart={showInvestChart}
            currency='£'
          />
        </Grid>
      }
    </Grid>
  )
}

export default withStyles(styles)(SummaryChart);
