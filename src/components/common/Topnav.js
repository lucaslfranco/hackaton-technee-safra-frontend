import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { api } from '../../services';

import { NotificationMarker } from '../';

import { COLORS } from '../../assets/constants';
import { LANGUAGES } from '../../assets/languages';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';
import combineStyles from '../../utils/combineStyles'

import {
	Box,
	Button,
	FormControlLabel,
	Grid,
	Menu,
	MenuItem,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core';

import {
	ContactSupportOutlined,
	Language,
	NotificationsActive,
	NotificationsOff,
} from '@material-ui/icons';

import MenuIcon from '@material-ui/icons/Menu';

const CustomSwitch = withStyles({
	root: {
		width: 64,
		height: 22,
		paddingTop: 0,
		paddingBottom: 0,
	},
	switchBase: {
		top: 3,
		left: 7,
		paddingTop: 0,
		paddingBottom: 0,
		color: 'white',
		'&$checked': {
			color: 'white',
			left: 3,
		},
		'&$checked + $track': {
			backgroundColor: COLORS.MAIN_COLOR_LIGHTER,
			opacity: 1,
		},
	},
	checked: {},
	input: {
		width: 16,
		left: 0,
	},
	thumb: {
		width: 16,
		height: 16,
	},
	track: {
		backgroundColor: COLORS.GRAY_1,
		opacity: 0.8,
		borderRadius: 12,
	},
})(Switch);

function Topnav(props) {
	// const classes = useStyles();
	const { classes } = props;

	const language = localStorage.getItem('lng');
	const role = parseInt(localStorage.getItem('role'));
	const firstName = localStorage.getItem('firstName')

	const origLanguage = LANGUAGES.filter(lang => lang.code === props.origLanguage)[0];
	const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', lang: 'English' });

	const [anchorLanguageMenu, setAnchorLanguageMenu] = useState(null);
	const [anchorProfileMenu, setAnchorProfileMenu] = useState(null);

	const [isEnabledNotifications, setEnabledNotifications] = useState(1);
	const [isOpenModal, setOpenModal] = useState(false);
	const [feedback, setFeedback] = useState('');
	const [isFeedbackSent, setFeedbackSent] = useState(false);

	useEffect(() => {
		const selectedLanguage = LANGUAGES.filter(lang => lang.code === language)[0] || { code: 'en', lang: 'English' };

		setSelectedLanguage(selectedLanguage);
		setEnabledNotifications(props.isEnabledNotifications)
	}, [language, props.isEnabledNotifications])


	const handleClick = (e, which) => {
		// if (which === 'notifications')
		// 	setAnchorNotifications(e.currentTarget);
		if (which === 'language')
			setAnchorLanguageMenu(e.currentTarget);
		else
			setAnchorProfileMenu(e.currentTarget);
	};

	const handleClose = () => {
		// setAnchorNotifications(null);
		setAnchorLanguageMenu(null);
		setAnchorProfileMenu(null);
	};

	const goTo = (route) => {
		handleClose();

		if (route.includes('home') && props.history.location.pathname.includes('home')) {
			setAnotherRole('user')
		}
		props.history.push(route)
	}

	const setAnotherRole = (role) => {
		props.history.replace('/#/home');
		props.setActiveRole(role);
	}

	const countPendingActions = (type) => {
		const { pendingActions } = props;

		if (pendingActions) {
			let pendingSubs = 0;
			let pendingVotes = 0;

			if (pendingActions.subscriptions)
				pendingSubs = props.pendingActions.subscriptions.filter(sub => sub.status === 'pending').length;
			if (pendingActions.votes)
				pendingVotes = props.pendingActions.votes.filter(vote => vote.status === 'pending').length;

			// If there's not the 'type' param, then return all pending actions
			if (!type)
				return pendingSubs + pendingVotes;

			// Type 1 for pending subscriptions approval
			if (pendingActions.subscriptions && type === 1)
				return pendingSubs;
			else if (type === 2)
				return pendingVotes;
			else
				return 0;
		}
	}

	const toggleNotifications = async () => {
		const cwid = localStorage.getItem('cwid');

		const body = {
			enable_email: isEnabledNotifications ? 0 : 1,
			id_user: cwid
		}

		setEnabledNotifications(isEnabledNotifications ? 0 : 1);
		await api.put(`/enable-email`, body);
	}

	const sendFeedback = async () => {
		const cwid = localStorage.getItem('cwid');

		await api.post(`/portal-feedback`, { feedback, username: cwid });
		setFeedbackSent(true);
		setFeedback('');
	}

	return (
		<Grid container component="main" className={classes.topnav}>
			<Box
				display="flex" alignItems="center"
			>
				{/* <img
					alt="logo-pslab"
					className={classes.logo}
					width={90}
					height={45}
					src='/images/logo-header-white.png'
					onClick={() => { goTo('/home') }}
				/> */}
				Safra Hub
			</Box>
			<Box
				display="flex" alignItems='flex-end'
				style={{ position: 'relative' }}
			>
				<Button
					aria-controls="profile-menu" aria-haspopup="true"
					className={classes.profileButton}
					onClick={(e) => handleClick(e, 'profile')}>
					<MenuIcon style={{ fontSize: 40, marginRight: 0 }} />
					<Typography className={classes.menuLabel}>
						Menu
					</Typography>
				</Button>
			</Box>

			<Menu
				id="language-menu"
				anchorEl={anchorLanguageMenu}
				getContentAnchorEl={null}
				keepMounted
				open={Boolean(anchorLanguageMenu)}
				onClose={handleClose}
				PaperProps={{ className: classes.languageMenu, style: { maxHeight: 390 } }}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>

				<div>
					<MenuItem
						className={`${classes.menuItem} ${language === 'de' ? ' selected' : ''}`}
						onClick={() => props.changeLanguage('de')}
					>
						Alemão
					</MenuItem>
					<MenuItem
						className={`${classes.menuItem} ${language === 'es' ? ' selected' : ''}`}
						onClick={() => props.changeLanguage('es')}
					>
						Espanhol
					</MenuItem>
					<MenuItem
						className={`${classes.menuItem} ${language === 'en' ? ' selected' : ''}`}
						onClick={() => props.changeLanguage('en')}
					>
						Inglês
					</MenuItem>
					<MenuItem
						className={`${classes.menuItem} ${language === 'pt' ? ' selected' : ''}`}
						onClick={() => props.changeLanguage('pt')}
					>
						Português
					</MenuItem>
					{origLanguage && !['de', 'es', 'en', 'pt'].includes(origLanguage.code) &&
						<MenuItem
							className={`${classes.menuItem} ${origLanguage.code === selectedLanguage.code ? ' selected' : ''}`}
							onClick={() => props.changeLanguage(origLanguage.code)}
						>
							{origLanguage.lang}
						</MenuItem>
					}
				</div>
				{/* {
					LANGUAGES.map(language =>
						<MenuItem key={language.code} className={classes.menuItem} onClick={() => props.changeLanguage(language.code)}>
							{language.lang}
						</MenuItem>
					)
				} */}
			</Menu>
			<Menu
				id="profile-menu"
				getContentAnchorEl={null}
				anchorEl={anchorProfileMenu}
				open={Boolean(anchorProfileMenu)}
				onClose={handleClose}
				PaperProps={{ className: classes.menu, style: { maxHeight: 390 } }}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<MenuItem className={`${classes.menuItem} ${classes.menuProfileItem}`} onClick={() => goTo('/minhas-ideias')}>
					<NotificationMarker>
						{countPendingActions(1)}
					</NotificationMarker>
					Minhas ideias
				</MenuItem>
				{/* <MenuItem className={`${classes.menuItem} ${classes.menuProfileItem}`} onClick={() => goTo('/minhas-ideias')}>
					<NotificationMarker>
						{countPendingActions(2)}
					</NotificationMarker>
					Minhas contribuições
				</MenuItem> */}
				{/* <MenuItem className={`${classes.menuItem} ${classes.menuProfileItem}`} onClick={handleClose}>
					Meu perfil
				</MenuItem> */}
				<MenuItem className={`${classes.menuItem} ${classes.menuProfileItem}`} onClick={props.logout}>
					Sair
				</MenuItem>
			</Menu>
			<NotificationMarker className={classes.mainNotificationMarker}>
				{countPendingActions()}
			</NotificationMarker>
		</Grid >
	);
}

const classes = theme => ({
	topnav: {
		padding: theme.spacing(0.5, 3),
		backgroundColor: COLORS.MAIN_COLOR_DARKER,
		color: 'white',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	logo: {
		margin: theme.spacing(0.5, 0, 0),
		cursor: 'pointer',
	},
	notifications: {
		maxWidth: 250,
		padding: theme.spacing(3, 2, 2),
		cursor: 'pointer',
		'& .link': {
			fontWeight: 600,
			lineHeight: 2,
		}
	},
	mainNotificationMarker: {
		left: 'unset!important',
		right: 52,
		top: 30,
	},
	menu: {
		color: COLORS.MAIN_COLOR_DARKER,
		borderRadius: 0,
		'& ul': {
			padding: '0!important',
		},
	},
	languageMenu: {
		color: COLORS.MAIN_COLOR_DARKER,
		borderRadius: 0,
		'& ul': {
			padding: '0!important',
		},
	},
	feedbackButton: {
		padding: theme.spacing(0.75, 1.25),
		margin: theme.spacing(0, 1.25, 0.75, 0),
		color: 'white',
		backgroundColor: '#55c599',
		background: 'linear-gradient(90deg,#43c852,#00acac)',
		fontSize: 11,
		border: 0,
	},
	feedbackModal: {
		width: 'unset',
		left: '-100px',
		right: 'unset',
		color: '#111',
		borderRadius: 6,
		'&.sent': {
			left: '-165px'
		},
	},
	menuItem: {
		padding: theme.spacing(1.25, 2),
		color: COLORS.MAIN_COLOR_DARKER,
		borderBottom: `1px solid ${COLORS.GRAY_2}`,
		'&.selected': {
			backgroundColor: '#ccc',
		},
		'&:last-child': {
			borderBottom: 'none',
		},
		'&:hover': {
			color: COLORS.MAIN_COLOR_LIGHTER,
		}
	},
	menuProfileItem: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: 190,
	},
	profileButton: {
		color: COLORS.FONT_COLOR,
		margin: theme.spacing(0, 1),
		padding: 0,
		textTransform: 'capitalize',
		minWidth: 38,
		'& .MuiButton-label': {
			display: 'flex',
			flexDirection: 'column',
		},
	},
	menuLabel: {
		fontSize: 9,
		marginTop: -7,
		letterSpacing: 1,
		textTransform: 'uppercase',
	},
	languagesLabel: {
		fontSize: 9,
		letterSpacing: 1,
		textTransform: 'uppercase',
	},
	checkboxLabel: {
		'& .MuiFormControlLabel-label': {
			fontSize: 9,
			marginTop: 2,
			letterSpacing: 1,
			textTransform: 'uppercase'
		},
	},
});

const combinedStyles = combineStyles(classes, styles);

export default withRouter(withStyles(combinedStyles)(Topnav));
