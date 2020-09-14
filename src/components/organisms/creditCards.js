import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
	Box,
	Grid,
	InputAdornment,
	LinearProgress,
	MenuItem,
	Typography,
	TextField,
} from '@material-ui/core';

import PaymentIcon from '@material-ui/icons/Payment';

function CreditCards({ classes, accounts, institution }) {
	const [selectedCard, setSelectedCard] = useState(0);
	const [filteredCards, setFilteredCards] = useState([]);
	const [cards, setCards] = useState([]);

	const [totalLimit, setTotalLimit] = useState(0);

	useEffect(() => {
		console.log(accounts);
		const cards = [
			{
				bankCode: accounts[0]?.bank_id || 6, bank: 'Banco Safra S.A', type: 'Visa', number: 'XXXX XXXX XXXX 1234',
				limit: 100000, currentUse: 55000, available: 45000
			},
			{
				bankCode: accounts[1]?.bank_id || 5, bank: 'Santander', type: 'MasterCard', number: 'XYXY XYXY XYXY 9876',
				limit: 80000, currentUse: 20000, available: 60000
			},
		];

		setCards(cards);
		filterCards();
	}, [accounts]);

	useEffect(() => {
		filterCards();
	}, [institution])

	const filterCards = () => {
		let filteredCards = cards;
		if (institution)
			filteredCards = cards.filter(card => card.bankCode === institution);

		setTotalLimit(filteredCards.reduce((a, b) => a + (b['limit'] || 0), 0));
		setFilteredCards(filteredCards);
	}

	const getProgress = () => {
		const card = cards[selectedCard];
		return 100 * card.currentUse / card.limit;
	}

	const formatter =
		new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2
		});

	return (
		<Grid>
			<Grid className={`${classes.container} ${classes.homeContainer}`}>
				<Grid item xs={12} className={`${classes.indicator} indicatorBlue`}>
					<Box align="center">
						<Typography component="span" className={classes.indicatorValue} style={{ fontSize: 32 }}>
							{formatter.format(totalLimit)}
						</Typography>
					</Box>
					<Box align="center">
						<Typography component="span" className={classes.indicatorLabel} style={{ fontSize: 22 }}>
							Limite Total de Crédito
						</Typography>
					</Box>
				</Grid>
				<Grid container justify="center">
					<Typography variant="h6" className="title" align="center">
						Cartões de Crédito
					</Typography>
				</Grid>

				<Grid container justify="center">
					<TextField
						id="creditCards"
						InputProps={{
							startAdornment:
								<InputAdornment position="start">
									<PaymentIcon />
								</InputAdornment>,
						}}
						select
						value={selectedCard}
						onChange={({ target: { value } }) => setSelectedCard(value)}
						variant="outlined"
						style={{ marginBottom: 28 }}
					>
						{filteredCards.map((card, i) => (
							<MenuItem key={i} value={i}>
								{card.number}
							</MenuItem>
						))}
					</TextField>

					<Box mb={2} width={1}>
						<Typography variant="h6" className="title" align="center" style={{ fontSize: 20 }}>Limite</Typography>
					</Box>

					{cards.length > 0 &&
						<>
							<LinearProgress
								variant="determinate"
								value={getProgress()}
								style={{ width: '100%', marginBottom: 4, height: 8, borderRadius: 2 }}
							/>
							<Grid container justify="space-between">
								<Typography align="center" style={{ fontWeight: 'bold' }}>
									Utilizado <br /> {formatter.format(cards[selectedCard].currentUse)}
								</Typography>
								<Typography align="center" style={{ fontWeight: 'bold' }}>
									Disponível <br /> {formatter.format(cards[selectedCard].available)}
								</Typography>
							</Grid>
						</>
					}
				</Grid>
			</Grid>
		</Grid >
	)
}

export default withStyles(styles)(CreditCards);
