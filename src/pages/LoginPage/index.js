import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Alert } from '../../components';
import { api } from '../../services';

import { ProfileModal } from '../../components';

import {
	Box,
	Button,
	CssBaseline,
	Grid,
	Snackbar,
	TextField,
	Typography
} from '@material-ui/core';

// function Copyright() {
// 	return (
// 		<Typography variant="body2" color="textSecondary" align="center">
// 			{'Copyright © '}
// 			<Link color="inherit" href="#">
// 				SafraHub
// 			</Link>
// 			{' '}
// 			{new Date().getFullYear()}
// 			{'.'}
// 		</Typography>
// 	);
// }

export default function LoginPage(props) {
	const classes = useStyles();

	const [username, setUsername] = useState('64809677559');
	const [password, setPassword] = useState('dKORMK876i');

	const [showRegister, setShowRegister] = useState(false);

	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const login = async (e) => {
		if (e) e.preventDefault();

		try {
			const body = {
				id: username,
				pwd: password
			};
			let { data } = await api.post('/validlogin', body);

			localStorage.setItem('customerName', data.customer_name);
			localStorage.setItem('customerId', data.customer_id);
			localStorage.setItem('token', data.token);
			localStorage.setItem('banks', JSON.stringify(data.banks));

			delete data.token;
			props.setUserData(data);

			props.setAuthenticated(true);
		}
		catch (e) {
			setErrorMessage('Erro ao realizar a autenticação');
			setOpen(true);
			props.setAuthenticated(false);
		}
	}

	const closeModal = () => {
		setShowRegister(false);
	}

	return (
		<Grid container component="main" className={classes.root}>
			{/* <button onClick={login}>asdasda</button> */}
			<CssBaseline />
			{/* <Grid container item xs={12} component={Paper} elevation={6} className={classes.loginContainer}> */}
			<Grid container>
				<Grid container direction="row" justify="space-between">
					<Grid item xs={4}>
						<img src="/images/safrahub_logo.png" alt="safrahub-logo" width="280" />
					</Grid>

					<Grid item xs={12} md={6} style={{ display: 'flex', flexWrap: 'wrap' }}>
						<Grid container component={'form'} onSubmit={login}>
							<Grid item xs={6} md={4} style={{ padding: 4 }}>
								<TextField
									variant="outlined"
									id="cpf"
									label="CPF"
									name="cpf"
									autoComplete="cpf"
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
									type="password"
									value={password}
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
						Sua vida financeira em um só lugar!
					</Typography>
				</Grid>

				<Grid container>
					<Typography style={{ fontSize: 18, color: '#777' }}>
						A segurança que você já conhece com o conforto que você precisava  <br />
						para gerir seu patrimônio e fazer transações de forma otimizada e totalmente integrada!
					</Typography>
				</Grid>

				{showRegister &&
					<ProfileModal
						closeModal={closeModal}
					/>
				}
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
