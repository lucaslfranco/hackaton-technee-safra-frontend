import { COLORS } from './constants';

const styles = theme => ({
	root: {},
	container: {
		padding: theme.spacing(1, 2, 2),
		backgroundColor: theme.palette.grey[200],
		borderRadius: 8,
		'& .title': {
			margin: theme.spacing(0, -4, 4),
			padding: theme.spacing(2, 4, 1),
			color: COLORS.MAIN_COLOR_DARKER,
			borderBottom: '1px solid #aaa',
			fontWeight: 600,
			textTransform: 'uppercase',
		},
	},
	wrapper: {
		padding: theme.spacing(0, 2),
	},
	tipsContainer: {
		height: '100%',
	},
	text: {
		lineHeight: '28px',
	},
	subtitle: {
		padding: theme.spacing(2),
	},
	form: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textfield: {
		margin: theme.spacing(1.5, 0, 3),
		// padding: theme.spacing(1, 2),
		backgroundColor: 'white',
		'& .MuiOutlinedInput-root': {
			borderRadius: 6,
		},
		'& :disabled': {
			backgroundColor: '#eee',
		}
	},
	label: {
		marginLeft: theme.spacing(0.75),
		fontSize: 14,
		fontWeight: 600,
		lineHeight: 1,
		'& span': {
			color: '#9cf',
		}
	},
	editLabel: {
		fontSize: 10,
		marginLeft: theme.spacing(0.5),
		color: COLORS.MAIN_COLOR_LIGHTER,
		textDecoration: 'underline',
	},
	checkbox: {
		color: COLORS.MAIN_COLOR,
	},
	tip: {
		paddingBottom: theme.spacing(4),
	},
	tipCheckbox: {
		'& span': {
			fontSize: 15,
			fontWeight: '600',
			textTransform: 'uppercase',
		}
	},
	tipText: {
		paddingLeft: 32,
		fontSize: 14,
		lineHeight: 1.25,
	},
	submitButton: {
		padding: theme.spacing(0.25, 2.5),
		backgroundColor: COLORS.MAIN_COLOR_LIGHTER,
		color: COLORS.FONT_COLOR,
	},
	arrow: {
		marginLeft: theme.spacing(2),
		width: 20,
		height: 20,
		color: COLORS.MAIN_COLOR_DARKER,
		border: `2px solid ${COLORS.MAIN_COLOR_DARKER}`,
		borderRadius: '50%',
		cursor: 'pointer',
	},
	icon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 20,
		height: 19,
		borderRadius: '50%',
		border: `2px solid ${theme.palette.grey[500]}`,
		backgroundColor: '#f5f8fa',
		'$root.Mui-focusVisible &': {
			outline: '2px auto rgba(19,124,189,.6)',
			outlineOffset: 2,
		},
		'input:hover ~ &': {
			backgroundColor: '#ebf1f5',
		},
		'input:disabled ~ &': {
			boxShadow: 'none',
			background: 'rgba(206,217,224,.5)',
		},
	},
	checkedIcon: {
		'&:before': {
			display: 'block',
			width: 12,
			height: 12,
			content: '""',
			backgroundColor: '#11d18d',
			borderRadius: '50%',
		},
		'input:hover ~ &': {
			// backgroundColor: '#106ba3',
		},
	},
	/* HOME */
	rootDetails: {
		padding: theme.spacing(6, 6, 3),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(4, 3),
		},
		'& .title': {
			color: COLORS.MAIN_COLOR_DARKER,
			fontSize: 22,
			fontWeight: 600,
		},
	},
	homeContainer: {
		position: 'relative',
		margin: theme.spacing(2, 0),
		borderRadius: 8,
		'& .title': {
			position: 'relative',
			margin: theme.spacing(0, -4, 2),
			padding: theme.spacing(2, 4, 1),
			border: 'none',
			'& p': {
				color: COLORS.MAIN_COLOR_DARKER,
				fontWeight: 600,
				textTransform: 'uppercase',
			},
			'& .specialBorderDetail': {
				position: 'absolute',
				width: 'calc(100% - 85px)',
				height: 4,
				marginTop: theme.spacing(0.5),
				borderRadius: 1,

				// background: 'rgba(97,227,45,1)',
				// background: '-moz-linear-gradient(left, rgba(97,227,45,1) 0%, rgba(97,227,45,1) 31%, rgba(80,182,250,1) 76%, rgba(28,200,230,1) 100%)',
				// background: '-webkit-gradient(left top, right top, color-stop(0%, rgba(97,227,45,1)), color-stop(31%, rgba(97,227,45,1)), color-stop(76%, rgba(80,182,250,1)), color-stop(100%, rgba(28,200,230,1)))',
				// background: '-webkit-linear-gradient(left, rgba(97,227,45,1) 0%, rgba(97,227,45,1) 31%, rgba(80,182,250,1) 76%, rgba(28,200,230,1) 100%)',
				// background: '-o-linear-gradient(left, rgba(97,227,45,1) 0%, rgba(97,227,45,1) 31%, rgba(80,182,250,1) 76%, rgba(28,200,230,1) 100%)',
				// background: '-ms-linear-gradient(left, rgba(97,227,45,1) 0%, rgba(97,227,45,1) 31%, rgba(80,182,250,1) 76%, rgba(28,200,230,1) 100%)',
				background: 'linear-gradient(to right, rgba(212,173,104,1) 0%, rgba(152,133,74,1) 100%)',
				filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#D4AD68', endColorstr='#1E2044', GradientType=1 )",
			},
		},
	},
	tableHeaders: {
		color: '#aaa',
		fontWeight: '600',
		paddingBottom: theme.spacing(1),
		marginBottom: theme.spacing(1),
		borderBottom: '1px solid #aaa',
	},
	tableRow: {
		position: 'relative',
		borderRadius: 3,
		padding: theme.spacing(2, 0),

		'&.selected': {
			backgroundColor: theme.palette.grey[300],
		},

		'& .ideaRowItem': {
			[theme.breakpoints.down('sm')]: {
				marginBottom: theme.spacing(2),
			},
		},
		'& .text': {
			textAlign: 'left',
			marginBottom: 0,
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
			},
		},
		'& .subtext': {
			fontSize: 14,
			fontWeight: 300,
		},
		'& .message': {
			color: '#777',
			fontSize: 14,
			maxHeight: 100,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(4, 0),
			borderBottom: '1px solid #ddd',
		},
	},
	indicator: {
		position: 'relative',
		margin: theme.spacing(1, 0),
		padding: theme.spacing(2),
		color: 'white',
		borderRadius: theme.spacing(0.35),
		'&.indicatorBalance': {
			backgroundColor: '#CCAE68',
		},
		'& .indicatorHint': {
			display: 'none',
			position: 'absolute',
		},
		'&:hover .indicatorHint': {
			display: 'flex',
			left: '20%',
			right: '-50%',
			padding: theme.spacing(1),
			fontSize: 12,
			backgroundColor: 'rgba(100,100,100,0.8)',
			borderRadius: theme.spacing(1),
			zIndex: 2,
		}
	},
	indicatorLabel: {
		fontSize: 18,
		fontWeight: 400,
	},
	indicatorValue: {
		fontSize: 26,
		fontWeight: 600,
	},
	morningCall: {
		// paddingRight: theme.spacing(2),
	},
	nextPageIcon: {
		color: '#aaa',
		transform: 'rotate(90deg)',
	},
	ideaField: {
		fontSize: 14,
		margin: theme.spacing(0.5, 0.5, 0.5, 0),
		fontWeight: 600,
	},
	ideaValue: {
		fontSize: 14,
		margin: theme.spacing(0.5, 0),
		fontWeight: 300,
	},
	closeModalBtn: {
		position: 'absolute',
		right: 12,
		top: 10,
		fontSize: 10,
		color: '#555',
		border: '1px solid #555',
		borderRadius: '50%',
		fontWeight: 600,
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 6,
		paddingRight: 6,
		cursor: 'pointer',
	},
	closeModalLink: {
		color: '#44b',
		cursor: 'pointer',
	},
	balanceFilterBtn: {
		border: '2px solid #555',
		borderRightColor: 'transparent',
		cursor: 'pointer',
		'&:first-of-type': {
			borderRadius: '3px 0px 0px 3px',
		},
		'&:last-of-type': {
			borderRadius: '0px 3px 3px 0px',
			borderRightColor: '#555',
		},
		'&.selected': {
			backgroundColor: '#555',
			color: 'white',
		}
	}
});

export default styles;