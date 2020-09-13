import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
	Box,
	Grid,
	Typography,
} from '@material-ui/core';

function Balance(props) {
	const { classes } = props;

	const [filteredTransactions, setFilteredTransactions] = useState([]);

	useEffect(() => {
		let trans = props.transactions;
		if (props.institution)
			trans = trans.filter(tran => tran.proprietaryBankTransactionCode.issuer === props.institution);

		setFilteredTransactions(trans);
	}, [props.transactions, props.institution])

	return (
		<Grid>
			<Grid className={`${classes.container} ${classes.homeContainer}`}>
				<Grid container justify="center">
					<Typography variant="h6" className="title" align="center">
						Extrato
					</Typography>
				</Grid>
				<Grid container justify="center">
					<Box px={2} py={1} className={classes.balanceFilterBtn}>
						+
					</Box>
					<Box px={2} py={1} className={classes.balanceFilterBtn}>
						Julho
					</Box>
					<Box px={2} py={1} className={classes.balanceFilterBtn}>
						Agosto
					</Box>
					<Box px={2} py={1} className={`${classes.balanceFilterBtn} selected`}>
						Setembro
					</Box>
				</Grid>
				<Grid container>
					<Box
						width={1} mt={3}
						className={classes.tableHeaders}
						display={'flex'}
					>
						<Grid item xs={2}>
							<Typography align="left"> Data </Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography align="center"> Descrição </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center"> Operação </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center"> Valor </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center">	Saldo final </Typography>
						</Grid>
					</Box>
				</Grid>

				{filteredTransactions.map((item, i) =>
					<Box
						key={item.transactionId}
						width={1} py={0.5}
						display={'flex'}
					>
						<Grid item xs={2}>
							<Typography align="left">	{moment(item.valueDateTime).format('DD/MM/yy')} </Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography align="center">{item.transactionInformation} </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center"> {item.proprietaryBankTransactionCode.code}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center">	R$ {item.amount.amount} </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center">	R$ {item.balance.amount.amount} </Typography>
						</Grid>
					</Box>
				)}
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(Balance);
