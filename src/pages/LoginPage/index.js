import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import { Alert } from '../../components';

import { stage } from '../../config';
import { api } from '../../services';

import { COLORS } from '../../assets/constants';

import { makeStyles } from '@material-ui/core/styles';

import {
	ProfileModal,
} from '../../components';

import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	CssBaseline,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	OutlinedInput,
	InputAdornment,
	InputLabel,
	Link,
	Paper,
	Snackbar,
	TextField,
	Typography
} from '@material-ui/core';

import {
	Visibility,
	VisibilityOff,
} from '@material-ui/icons';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				SafraHub
			</Link>
			{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function LoginPage(props) {
	const classes = useStyles();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	async function login(e) {
		e.preventDefault();

		try {
			setIsLoading(true);
			let { data } = await api.post('/login', { username, password });
			const userData = {
				cwid: data.return.cwid,
				email: data.return.email,
				fullName: data.return.nameUser,
			};

			const cookies = new Cookies();
			cookies.set('token', data.token, { path: '/' });
			cookies.set('user', userData, { path: '/' });

			localStorage.setItem('cwid', userData.cwid.toUpperCase());
			localStorage.setItem('firstName', userData.fullName.split(' ')[0]);
			localStorage.setItem('fullName', userData.fullName);
			localStorage.setItem('userEmail', userData.email);

			props.refreshUserData();
		}
		catch ({ response: { data } }) {
			if (data.result && (data.result.code === 2))
				setErrorMessage('Usuário ou senha incorretos!');
			else if (data.result && (data.result.code === 4))
				setErrorMessage('Usuário inativo ou inválido!');
			else if (data.result && (data.result.code === 14))
				setErrorMessage('Usuário bloqueado!');
			else
				setErrorMessage('Erro ao realizar a autenticação');

			console.log(errorMessage)

			setOpen(true);
			// props.setAuthenticated(false);
		}
		finally {
			setIsLoading(false);
		}
	}

	const closeModal = () => {
		setShowRegister(false);
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			{/* <Grid container item xs={12} component={Paper} elevation={6} className={classes.loginContainer}> */}
			<Grid container>
				<Grid container direction="row" justify="space-between">
					<Grid item xs={4}>
						<img src="/images/safrahub_logo.png" alt="safrahub-logo" width="280" />
					</Grid>

					<Grid item xs={12} md={6} style={{ display: 'flex', flexWrap: 'wrap' }}>
						<Grid container>
							<Grid item xs={6} md={4} style={{ padding: 4 }}>
								<TextField
									variant="outlined"
									id="email"
									label="E-mail"
									name="email"
									autoComplete="email"
									autoFocus
									value={username}
									onChange={({ target: { value } }) => setUsername(value)}
									required
								/>
								<Box
									my={2} mx={1}
									fontWeight="bold"
									style={{ cursor: 'pointer' }}
									onClick={() => setShowRegister(true)}
								>
									Cadastrar
								</Box>
							</Grid>
							<Grid item xs={6} md={4} style={{ padding: 4 }}>
								<TextField
									variant="outlined"
									id="password"
									label="Senha"
									name="password"
									autoComplete="password"
									autoFocus
									type="password"
									value={username}
									onChange={({ target: { value } }) => setPassword(value)}
									required
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									className={classes.submitBtn}
								>
									Entrar
						</Button>
							</Grid>
						</Grid>
						<Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid container>
					<Typography component={Box} variant="h4" fontWeight="bold">
						Sua vida financeira em um só lugar
					</Typography>
				</Grid>

				<Grid container>
					<Typography style={{ fontSize: 18, color: '#777' }}>
						Sua vida financeira em um só lugarua vida <br /> financeira em um só lugar
					</Typography>
				</Grid>

				{showRegister &&
					<ProfileModal
						closeModal={closeModal}
					/>
				}

				{false &&
					<Grid item xs={8} sm={6} md={4} className={classes.paper}>
						<form className={classes.full} onSubmit={login}>
							<TextField
								variant="outlined"
								margin="normal"
								id="email"
								label="E-mail"
								name="email"
								autoComplete="email"
								autoFocus
								value={username}
								onChange={({ target: { value } }) => setUsername(value)}
								fullWidth
								required
							/>
							{showRegister &&
								<>
									<TextField
										variant="outlined"
										margin="normal"
										id="phone"
										label="Nº de telefone"
										name="phone"
										autoComplete="Telefone"
										autoFocus
										value={phone}
										onChange={({ target: { value } }) => setPhone(value)}
										fullWidth
										required
									/>
								</>
							}
							<FormControl className={classes.full} variant="outlined">
								<InputLabel htmlFor="standard-adornment-password">
									Senha *
							</InputLabel>
								<OutlinedInput
									id="standard-adornment-password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={({ target: { value } }) => setPassword(value)}
									required
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => { setShowPassword(!showPassword) }}
												onMouseDown={() => { }}
												edge="end"
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
							</FormControl>

							{isLoading ?
								<Grid item xs={12} align="center" style={{ marginTop: 16 }}>
									<CircularProgress size={58} thickness={4} />
								</Grid>
								: (showRegister ?
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Cadastrar
								</Button> :
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Entrar
								</Button>
								)
							}

							{showRegister ?
								<Box onClick={() => setShowRegister(false)} align="center">
									Já possui uma conta? Clique aqui para fazer login.
						</Box> :
								<Box onClick={() => setShowRegister(true)} align="center">
									Ainda não possui uma conta? Clique aqui para fazer o cadastro.
						</Box>
							}

							<Box mt={3}>
								<Copyright />
							</Box>
						</form>

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
					</Grid>
				}
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: -64,
		height: '100vh',
		padding: theme.spacing(6, 2, 6, 12),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(6),
		}
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random/nature)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	loginContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	full: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submitBtn: {
		marginTop: 4,
		marginLeft: 4,
		padding: theme.spacing(1.9, 8),
		backgroundColor: '#114263',
	},
}));
