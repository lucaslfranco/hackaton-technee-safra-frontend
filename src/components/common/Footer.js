import React from 'react';
import { withRouter } from 'react-router-dom';

import { COLORS } from '../../assets/constants';
import { makeStyles } from '@material-ui/core/styles';

import {
	Grid,
	Link,
	Typography
} from '@material-ui/core/';

function Footer(props) {
	const classes = useStyles();

	return (
		<Grid container component="main" alignItems="flex-start" className={classes.root}>
			<Grid item xs={12} sm={12} md={3} >
				<img src="/images/safrahub_logo2.png" alt="Safra Logo" height="70" />
				{/* Safra Hub */}
			</Grid>
			<Grid container item direction='column' xs={12} sm={6} md={3} className={classes.footerSection}>
				<Typography variant="subtitle2" gutterBottom>
					Home
				</Typography>
				<Link variant="body2" color="inherit" href="/#">
					Sobre
				</Link>
				<Link variant="body2" color="inherit" href="/#">
					Features
				</Link>
				<Link variant="body2" color="inherit" href="/#">
					Contato
				</Link>
			</Grid>

			<Grid container item direction='column' xs={12} sm={6} md={3} className={classes.footerSection}>
				<Typography variant="subtitle2" gutterBottom>
					Blog
				</Typography>
				<Link variant="body2" color="inherit" href="#/" target="_blank" rel="noreferrer"> Search </Link>
				<Link variant="body2" color="inherit" href="#/" target="_blank" rel="noreferrer"> Privacy </Link>
			</Grid>
			<Grid container item xs={12} sm={12} md={3} />
		</Grid>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4, 8),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: COLORS.MAIN_COLOR_DARKER,
		color: 'white',
		[theme.breakpoints.down('sm')]: {
			textAlign: 'center',
		},
	},
	footerSection: {
		[theme.breakpoints.down('sm')]: {
			marginTop: theme.spacing(3),
		},
	},
}));

export default withRouter(Footer);
