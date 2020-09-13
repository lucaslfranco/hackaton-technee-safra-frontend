import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
	Box,
	Grid,
	Typography,
	Button,
	TextField,
	Paper,
	MenuItem,
} from '@material-ui/core';

function Transfer(props) {

	const [transferData, setTransferData] = useState({});

	const institutions = [
		{ label: 'Safra', value: 'safra' },
		{ label: 'Santander', value: 'santander' },
		{ label: 'Itaú', value: 'itau' },
		{ label: 'Bradesco', value: 'bradesco' },
		{ label: 'Barclays', value: 'barclays' },
	];

	const { classes } = props;
	return (
		<Grid container justify="center" className={`${classes.container} ${classes.homeContainer}`}>
			<Grid container justify="center">
				<Typography variant="h6" className="title" align="center">
					Transferência
				</Typography>
			</Grid>
			<Grid component={'form'} container item xs={4} justify="center" onSubmit={props.transfer}>
				<Box width={1} mt={1}>
					<TextField
						variant="outlined"
						id="banco-target"
						label="Banco de Destino"
						name="banco-target"
						autoComplete="banco-target"
						size="small"
						fullWidth
						select
						// value={username}
						// onChange={({ target: { value } }) => setUsername(value)}
						required
					>
						{institutions.map((option) =>
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						)}
					</TextField>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="banco-target"
						label="Tipo de Conta"
						name="banco-target"
						autoComplete="banco-target"
						size="small"
						fullWidth
						select
						// value={username}
						// onChange={({ target: { value } }) => setUsername(value)}
						required
					>
						{institutions.map((option) =>
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						)}
					</TextField>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="email"
						label="Agência"
						name="email"
						autoComplete="email"
						size="small"
						fullWidth
						// value={username}
						// onChange={({ target: { value } }) => setUsername(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="account"
						label="Conta"
						name="account"
						autoComplete="account"
						size="small"
						fullWidth
						// value={username}
						// onChange={({ target: { value } }) => setUsername(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="email"
						label="CPF"
						name="email"
						autoComplete="email"
						size="small"
						fullWidth
						// value={username}
						// onChange={({ target: { value } }) => setUsername(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2} mb={4}>
					<TextField
						variant="outlined"
						id="name"
						label="Nome"
						name="name"
						autoComplete="name"
						size="small"
						fullWidth
						// value={username}
						// onChange={({ target: { value } }) => setUsername(value)}
						required
					/>
				</Box>
				<Grid item>
					<Box
						mb={4} px={6}
						component={Button}
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						className={classes.submitBtn}
						style={{ color: 'white', backgroundColor: '#114263' }}
					>
						Avançar
						</Box>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(Transfer);
