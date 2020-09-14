import React, { useState } from 'react';

// import { api } from '../../services';

import { Alert } from '../';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';
import combineStyles from '../../utils/combineStyles'

import {
	Box,
	Button,
	Grid,
	FormControlLabel,
	Checkbox,
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

	const [step, setStep] = useState(1);
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const modalStyle = {
		position: 'relative',
		// width: '32%',
		minHeight: 300,
		padding: 32,
		borderRadius: 2,
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
			style={{ backgroundColor: 'rgba(0,0,0,0.4)', position: 'fixed', top: 0, left: 0, zIndex: 5, padding: 32 }}
		>
			<Grid container item xs={11} md={4} justify="center" style={modalStyle}>
				{step === 1 ?
					<>
						<Typography variant="h4" align="center" style={{ padding: 12, fontWeight: "bold" }}>
							Cadastro
				</Typography>
						<Grid item xs={11} md={9} style={{ padding: 12, paddingBottom: 20 }}>

							<Grid component={'form'} container justify="space-between" onSubmit={registerUser}>
								{/* <Box className={classes.closeModalBtn} onClick={props.closeModal}>X</Box> */}

								<Box width={1} my={2}>
									<TextField
										variant="outlined"
										id="fullname"
										label="Nome Completo"
										name="fullname"
										autoComplete="fullname"
										autoFocus
										fullWidth
										size="small"
										value={fullName}
										onChange={({ target: { value } }) => setFullName(value)}
										required
									/>
								</Box>

								<Box width={1} mb={2}>
									<TextField
										variant="outlined"
										id="birthdate"
										label="Data de Nascimento"
										name="birthdate"
										autoComplete="birthdate"
										fullWidth
										size="small"
										value={birthDate}
										onChange={({ target: { value } }) => setBirthDate(value)}
										required
									/>
								</Box>
								<Box width={1} mb={2}>
									<TextField
										variant="outlined"
										id="cpf"
										label="CPF"
										name="cpf"
										autoComplete="cpf"
										fullWidth
										size="small"
										value={cpf}
										onChange={({ target: { value } }) => setCPF(value)}
										required
									/>
								</Box>
								<Box width={1} mb={2}>
									<TextField
										variant="outlined"
										id="email"
										label="E-mail"
										name="email"
										autoComplete="email"
										fullWidth
										size="small"
										value={username}
										onChange={({ target: { value } }) => setUsername(value)}
										required
									/>
								</Box>
								<Box width={1} mb={2}>
									<TextField
										variant="outlined"
										id="password"
										label="Senha"
										name="password"
										autoComplete="password"
										type="password"
										fullWidth
										size="small"
										value={password}
										onChange={({ target: { value } }) => setPassword(value)}
										required
									/>
								</Box>
								<Box width={1} mb={2}>
									<TextField
										variant="outlined"
										id="confirmpassword"
										label="Confirme a senha"
										name="confirmpassword"
										autoComplete="confirm-password"
										fullWidth
										size="small"
										type="password"
										value={confirmPassword}
										onChange={({ target: { value } }) => setConfirmPassword(value)}
										required
									/>
								</Box>
								{/* <FormControlLabel
									control={<Checkbox value="remember" color="primary" required />}
									label={<Box style={{ fontSize: 13 }}>Declaro que li e aceito os termos de uso</Box>}
								/> */}
								<Box width={1} mt={2}>
									<Button
										fullWidth
										type="submit"
										variant="contained"
										color="primary"
										style={{ backgroundColor: '#114263' }}
										onClick={() => setStep(2)}
									>
										Continuar
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
					</> :
					<>
						<Typography variant="h5" align="center" style={{ padding: 12, fontWeight: "bold" }}>
							Prezado(a) Cliente
						</Typography>

						<Typography align="center" style={{ fontSize: 14, lineHeight: 1.2, paddingLeft: 32, paddingRight: 32, fontWeight: "bold", marginTop: 12 }}>
							Para o acesso é necessário nomear este
							dispositivo e inserir o código enviado para o
							telefone cadastrado.
						</Typography>
						<Grid item xs={11} md={9} style={{ padding: 12, paddingBottom: 20 }}>
							<Grid component={'form'} container justify="space-between" onSubmit={registerUser}>
								{/* <Box className={classes.closeModalBtn} onClick={props.closeModal}>X</Box> */}

								<Box width={1} my={2}>
									<TextField
										variant="outlined"
										id="fullname"
										label="Nome do dispositivo"
										name="fullname"
										autoComplete="fullname"
										autoFocus
										fullWidth
										size="small"
										value={fullName}
										onChange={({ target: { value } }) => setFullName(value)}
										required
									/>
								</Box>
								<Box width={1} mb={2}>
									<TextField
										variant="outlined"
										id="password"
										label="Código"
										name="password"
										autoComplete="password"
										type="password"
										fullWidth
										size="small"
										value={password}
										onChange={({ target: { value } }) => setPassword(value)}
										required
									/>
								</Box>

								<Typography align="center" style={{ fontSize: 12, lineHeight: 1.3, fontWeight: "500", marginTop: 16, marginBottom: 16, marginLeft: -32, marginRight: -32 }}>
									O cadastramento do computador é um recurso adicional de segurança, que permite realizar transações, identificando o computador do usuário. Este recurso adicional não dispensa os cuidados usuais para acesso à internet, como uso de programas antivírus atualizados e firewall.
								</Typography>

								<FormControlLabel
									control={<Checkbox value="remember" color="primary" required />}
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
					</>
				}
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