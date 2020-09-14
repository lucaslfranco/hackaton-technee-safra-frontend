import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
	Box,
	Grid,
	Typography,
} from '@material-ui/core';

function Transactions(props) {
	const { classes } = props;

	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [selectedPeriod, setSelectedPeriod] = useState(null);

	useEffect(() => {
		filterByInstitution();
	}, [props.transactions, props.institution])

	useEffect(() => {
		filterByPeriod();
	}, [selectedPeriod])

	const filterByInstitution = () => {
		const bankAccounts = props.accounts.filter(acc => acc.bank_id === props.institution).map(acc => acc.bank_account);

		let trans = props.transactions;
		if (props.institution)
			trans = trans.filter(tran => bankAccounts.includes(tran.account_id));

		setFilteredTransactions(trans);
	}

	const filterByPeriod = async () => {
		// await filterByInstitution();

		if (selectedPeriod !== null) {
			let filteredByPeriod = [];
			if (selectedPeriod === '+') {
				const previousMonths = moment().subtract(2, 'month');
				filteredByPeriod = filteredTransactions.filter(tran => moment(tran.valueDateTime).isBefore(previousMonths, 'month'));
			}
			else {
				const lastMonth = moment().subtract(selectedPeriod, 'month');
				filteredByPeriod = filteredTransactions.filter(tran => moment(tran.valueDateTime).isSame(lastMonth, 'month'));
			}
			setFilteredTransactions(filteredByPeriod);
		}
		else {
			filterByInstitution();
		}
	}

	return (
		<Grid>
			<Grid className={`${classes.container} ${classes.homeContainer}`}>
				<Grid container justify="center">
					<Typography variant="h6" className="title" align="center">
						Extrato
					</Typography>
				</Grid>
				<Grid container justify="center">
					<Box
						px={2} py={1}
						className={`${classes.balanceFilterBtn} ${selectedPeriod === '+' ? 'selected' : ''}`}
						onClick={() => setSelectedPeriod('+')}>
						+
					</Box>
					<Box
						px={2} py={1}
						className={`${classes.balanceFilterBtn} ${selectedPeriod === 1 ? 'selected' : ''}`}
						onClick={() => setSelectedPeriod(1)}>
						Agosto
					</Box>
					<Box
						px={2} py={1}
						className={`${classes.balanceFilterBtn} ${selectedPeriod === 0 ? 'selected' : ''}`}
						onClick={() => setSelectedPeriod(0)}>
						Setembro
					</Box>
					<Box
						px={2} py={1}
						className={`${classes.balanceFilterBtn} ${selectedPeriod === null ? 'selected' : ''}`}
						onClick={() => setSelectedPeriod(null)}>
						Tudo
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
						<Grid item xs={2}>
							<Typography align="center">	Conta </Typography>
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
					</Box>
				</Grid>

				{filteredTransactions.map((item, i) =>
					<Box
						key={item.transaction_id}
						width={1} py={0.5}
						display={'flex'}
					>
						<Grid item xs={2}>
							<Typography align="left"> {item.transaction_date} </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center"> {item.account_id} </Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography align="center">{item.transaction_description} </Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center"> {item.transaction_receipt}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="center">	R$ {item.transaction_amount} </Typography>
						</Grid>
					</Box>
				)}
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(Transactions);
