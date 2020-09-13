import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
	AppBar,
	Box,
	Tabs,
	Tab,
	Typography,
} from '@material-ui/core';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function ScrollableTabsButtonForce(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const institutions = [
		{
			id: 6,
			path: '/images/safra_logo.png',
			label: 'Banco Safra S.A',
			logoHeight: '65',
		},
		{
			id: 1,
			path: '/images/bb_logo.png',
			label: 'Banco do Brasil',
			logoHeight: '75',
		},
		{
			id: 2,
			path: '/images/bradesco_logo.png',
			label: 'Bradesco',
			logoHeight: '55',
		},
		{
			id: 3,
			path: '/images/nubank_logo.png',
			label: 'Nubank',
			logoHeight: '45',
		},
		{
			id: 4,
			path: '/images/itau_logo.png',
			label: 'Itau',
			logoHeight: '55',
		},
		{
			id: 5,
			path: '/images/santander_logo.png',
			label: 'Santander',
			logoHeight: '65',
		},
		{
			id: 7,
			path: '/images/barclays_logo.png',
			label: 'Barclays',
			logoHeight: '85',
		},
	]

	const [userInstitutions, setUserInstitutions] = useState([]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		const accountsIds = props.accounts.map(acc => acc.bank_id);
		const inst = institutions.filter(inst => accountsIds.includes(inst.id));
		setUserInstitutions(inst);
	}, [props.accounts]);

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons="on"
					indicatorColor="primary"
					textColor="primary"
					aria-label="scrollable force tabs"
				>
					<Tab
						icon={<img src='/images/safrahub_logo.png' alt='SafraHub Logo' height="70" />}
						{...a11yProps(0)}
						style={{ opacity: (props.institution ? 0.4 : 1) }}
						onClick={() => props.setInstitution(null)}
					/>

					{userInstitutions.map((inst, i) =>
						<Tab
							key={inst.path}
							icon={<img src={inst.path} alt={inst.label} height={inst.logoHeight} />}
							{...a11yProps(i)}
							style={{ opacity: (props.institution === inst.id ? 1 : 0.4) }}
							onClick={() => props.setInstitution(inst.id)}
						/>
					)}
				</Tabs>
			</AppBar>
			{/* <TabPanel value={value} index={0}>
			</TabPanel>
			<TabPanel value={value} index={1}>
      </TabPanel>
			<TabPanel value={value} index={2}>
      </TabPanel>
			<TabPanel value={value} index={3}>
      </TabPanel>
			<TabPanel value={value} index={4}>
      </TabPanel> */}
		</div>
	);
}
