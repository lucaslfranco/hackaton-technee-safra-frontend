import React, { useState } from 'react';

import { api } from '../../services';
import { LANGUAGES } from '../../assets/languages';

import { Alert } from '../';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';
import combineStyles from '../../utils/combineStyles'

import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	FormControlLabel,
	Checkbox,
	Select,
	Snackbar,
	TextField,
	Typography,
} from '@material-ui/core';

function ProfileModal(props) {
	const { classes } = props

	const [fullName, setFullName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [cpf, setCPF] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const modalStyle = {
		position: 'relative',
		// width: '32%',
		minHeight: 300,
		padding: 18,
		borderRadius: 4,
		backgroundColor: 'white',
		color: '#333',
	}

	const registerUser = async (e) => {
		if (e) e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage('A confirmação de senha deve ser igual a senha');
			setOpen(true);
			return;
		}
		console.log('Sucesso')

	}

	return (
		<Box
			display='flex' justifyContent='center' alignItems='center' width={1} height={1}
			style={{ backgroundColor: 'rgba(0,0,0,0.4)', position: 'fixed', top: 0, left: 0, zIndex: 5 }}
		>
			<Grid container item xs={11} md={4} justify="center" style={modalStyle}>
				<Typography variant="h4" align="center" style={{ padding: 12, fontWeight: "bold" }}>
					Cadastro
				</Typography>

				<Grid item xs={11} md={9} style={{ padding: 12, paddingBottom: 20 }}>

					<Grid component={'form'} container justify="space-between" onSubmit={registerUser}>
						{/* <Box className={classes.closeModalBtn} onClick={props.closeModal}>X</Box> */}

						<Box width={1} my={1}>
							<TextField
								variant="outlined"
								id="fullname"
								label="Nome Completo"
								name="fullname"
								autoComplete="fullname"
								autoFocus
								fullWidth
								value={fullName}
								onChange={({ target: { value } }) => setFullName(value)}
								required
							/>
						</Box>

						<Box width={1} mb={1}>
							<TextField
								variant="outlined"
								id="birthdate"
								label="Data de Nascimento"
								name="birthdate"
								autoComplete="birthdate"
								fullWidth
								value={birthDate}
								onChange={({ target: { value } }) => setBirthDate(value)}
								required
							/>
						</Box>
						<Box width={1} mb={1}>
							<TextField
								variant="outlined"
								id="cpf"
								label="CPF"
								name="cpf"
								autoComplete="cpf"
								fullWidth
								value={cpf}
								onChange={({ target: { value } }) => setCPF(value)}
								required
							/>
						</Box>
						<Box width={1} mb={1}>
							<TextField
								variant="outlined"
								id="email"
								label="E-mail"
								name="email"
								autoComplete="email"
								fullWidth
								value={username}
								onChange={({ target: { value } }) => setUsername(value)}
								required
							/>
						</Box>
						<Box width={1} mb={1}>
							<TextField
								variant="outlined"
								id="password"
								label="Senha"
								name="password"
								autoComplete="password"
								type="password"
								fullWidth
								value={password}
								onChange={({ target: { value } }) => setPassword(value)}
								required
							/>
						</Box>
						<Box width={1} mb={1}>
							<TextField
								variant="outlined"
								id="confirmpassword"
								label="Confirme a senha"
								name="confirmpassword"
								autoComplete="confirm-password"
								fullWidth
								type="password"
								value={confirmPassword}
								onChange={({ target: { value } }) => setConfirmPassword(value)}
								required
							/>
						</Box>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label={<Box style={{ fontSize: 13 }}>Declaro que li e aceito os termos de uso</Box>}
						/>
						<Box width={1} mt={2}>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								color="primary"
								style={{ backgroundColor: '#114263' }}
							>
								Criar cadastro
						</Button>
							<Box
								mt={2}
								className={classes.closeModalLink}
								onClick={props.closeModal}
								align="center"
							>
								Sair
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				autoHideDuration={5000}
				onClose={() => setOpen(false)}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
		</Box>
	)
}

const combinedStyles = combineStyles({}, styles);

export default withStyles(combinedStyles)(ProfileModal);