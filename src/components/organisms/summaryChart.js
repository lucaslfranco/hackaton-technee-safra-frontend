import React, { useState } from 'react';

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

function SummaryChart(props) {

  const { classes } = props;

  const [isBalanceVisible, setBalanceVisible] = useState(false);
  const [isBalance2Visible, setBalance2Visible] = useState(false);

  return (
    <Grid className={`${classes.container} ${classes.homeContainer}`}>
      <Grid container>
        <Grid container item xs={12} justify="space-between">
          <Grid item xs={6} style={{ padding: 8 }}>
            <Grid item xs={12} className={`${classes.indicator} indicatorBalance`}>
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
                      ? 'R$ 45.000'
                      : '-'
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid xs={6} style={{ padding: 8 }}>
            <Grid item xs={12} className={`${classes.indicator} indicatorBalance`}>
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
                      ? 'R$ 25.000'
                      : '-'
                  }
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Chart />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(SummaryChart);
