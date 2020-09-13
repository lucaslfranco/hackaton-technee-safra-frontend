import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
	Box,
	Grid,
	AppBar,
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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const institutions = [
		{
			path: '/images/safra_logo.png',
			label: 'BancoSafra',
			logoHeight: '65',
		},
		{
			path: '/images/santander_logo.png',
			label: 'Santander',
			logoHeight: '65',
		},
		{
			path: '/images/itau_logo.png',
			label: 'Itau',
			logoHeight: '55',
		},
		{
			path: '/images/bradesco_logo.png',
			label: 'Bradesco',
			logoHeight: '55',
		},
		{
			path: '/images/barclays_logo.png',
			label: 'Barclays',
			logoHeight: '85',
		},
	]

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
					elevation={2}
				>
					<Tab
						icon={<img src='/images/safrahub_logo.png' height="70" />}
						{...a11yProps(0)}
						onClick={() => props.setInstitution(null)}
					/>

					{institutions.map((inst, i) =>
						<Tab
							icon={<img src={inst.path} height={inst.logoHeight} />}
							{...a11yProps(i)}
							onClick={() => props.setInstitution(inst.label)}
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
