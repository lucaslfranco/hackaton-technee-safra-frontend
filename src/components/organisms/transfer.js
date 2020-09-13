import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
	Box,
	Grid,
	Typography,
	Button,
	TextField,
	MenuItem,
} from '@material-ui/core';

function Transfer(props) {

	const [targetBank, setTargetBank] = useState('422')
	const [bankType, setBankType] = useState('')
	const [agency, setAgency] = useState('0071')
	const [account, setAccount] = useState('1234533')
	const [cpf, setCPF] = useState('12345678933')
	const [fullName, setFullName] = useState('Mark Zuckerberg da Silva')
	const [value, setValue] = useState('250.00')
	const [description, setDescription] = useState('Mensalidade Academia')

	const institutions = [
		{ label: 'Safra', value: '422' },
		{ label: 'Santander', value: 'santander' },
		{ label: 'Itaú', value: 'itau' },
		{ label: 'Bradesco', value: 'bradesco' },
		{ label: 'Barclays', value: 'barclays' },
	];

	const { classes } = props;

	const submitTransfer = (e) => {
		e.preventDefault();

		const data = {
			targetBank,
			bankType,
			agency,
			account,
			cpf,
			fullName,
			value,
			description,
		}

		props.transfer(data);
	}

	return (
		<Grid container justify="center" className={`${classes.container} ${classes.homeContainer}`}>
			<Grid container justify="center">
				<Typography variant="h6" className="title" align="center">
					Transferência
				</Typography>
			</Grid>
			<Grid component={'form'} container item xs={4} justify="center" onSubmit={submitTransfer}>
				<Box width={1} mt={1}>
					<TextField
						variant="outlined"
						id="targetBank"
						label="Banco de Destino"
						name="targetBank"
						autoComplete="targetBank"
						size="small"
						fullWidth
						select
						value={targetBank}
						onChange={({ target: { value } }) => setTargetBank(value)}
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
						id="bankType"
						label="Tipo de Conta"
						name="bankType"
						autoComplete="bankType"
						size="small"
						fullWidth
						select
						value={bankType}
						onChange={({ target: { value } }) => setBankType(value)}
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
						id="agency"
						label="Agência"
						name="agency"
						autoComplete="agency"
						size="small"
						fullWidth
						value={agency}
						onChange={({ target: { value } }) => setAgency(value)}
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
						value={account}
						onChange={({ target: { value } }) => setAccount(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="cpf"
						label="CPF"
						name="cpf"
						autoComplete="cpf"
						size="small"
						fullWidth
						value={cpf}
						onChange={({ target: { value } }) => setCPF(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="name"
						label="Nome"
						name="name"
						autoComplete="name"
						size="small"
						fullWidth
						value={fullName}
						onChange={({ target: { value } }) => setFullName(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2}>
					<TextField
						variant="outlined"
						id="value"
						label="Valor (R$)"
						name="value"
						autoComplete="value"
						size="small"
						type="number"
						fullWidth
						value={value}
						onChange={({ target: { value } }) => setValue(value)}
						required
					/>
				</Box>
				<Box width={1} mt={2} mb={4}>
					<TextField
						variant="outlined"
						id="description"
						label="Descrição"
						name="description"
						autoComplete="description"
						size="small"
						fullWidth
						value={description}
						onChange={({ target: { value } }) => setDescription(value)}
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
