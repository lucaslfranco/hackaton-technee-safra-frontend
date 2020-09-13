import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		color: '#333',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#262E58',
		color: 'white',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function Sidenav(props) {
	const classes = useStyles();
	const theme = useTheme();
	let firstName = localStorage.getItem('customerName');
	firstName = firstName.split(' ')[0];
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const changePage = (page) => {
		handleDrawerClose();
		props.setPage(page);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Grid container item justify="space-between" alignItems="center">
						<Typography variant="h6" noWrap>
							Olá, {firstName || ''}
						</Typography>
						<Grid item style={{ display: 'flex', jusfify: "flex-end", alignItems: "center" }}>
							<Box mr={1}>
								<img src="/images/brazil_flag.png" alt="Brazil flag" height="35" />
							</Box>
							<Box mr={1}>
								<img src="/images/spain_flag.png" alt="Spain flag" height="35" />
							</Box>
							<Box mr={1}>
								<img src="/images/us_flag.png" alt="US flag" height="40" />
							</Box>
							<IconButton
								color="inherit"
								aria-label="logout"
								onClick={props.logout}
								edge="end"
								className={clsx(classes.menuButton, open && classes.hide)}
							>
								<ExitToAppIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar >
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button key={'Página Inicial'} onClick={() => changePage('home')}>
						<ListItemIcon style={{ color: 'white' }}><HomeIcon /></ListItemIcon>
						<ListItemText primary={'Página Inicial'} />
					</ListItem>
					<ListItem button key={'Extrato'} onClick={() => changePage('transactions')}>
						<ListItemIcon style={{ color: 'white' }}><ListIcon /></ListItemIcon>
						<ListItemText primary={'Extrato'} />
					</ListItem>
					<ListItem button key={'Transferência'} onClick={() => changePage('transfer')}>
						<ListItemIcon style={{ color: 'white' }}><AttachMoneyIcon /></ListItemIcon>
						<ListItemText primary={'Transferência'} />
					</ListItem>
					<ListItem button key={'Cartões de Crédito'} onClick={() => changePage('creditCards')}>
						<ListItemIcon style={{ color: 'white' }}><PaymentIcon /></ListItemIcon>
						<ListItemText primary={'Cartões de Crédito'} />
					</ListItem>
					<ListItem button key={'Outros Serviços'} onClick={() => changePage('others')}>
						<ListItemIcon style={{ color: 'white' }}> <MoreVertIcon /> </ListItemIcon>
						<ListItemText primary={'Outros Serviços'} />
					</ListItem>
				</List>
				{/* <Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List> */}
			</Drawer>
		</div >
	);
}
