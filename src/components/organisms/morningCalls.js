import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
	Box,
	Grid,
	Typography,
} from '@material-ui/core';

import {
	ArrowForwardIos,
} from '@material-ui/icons';

function MorningCalls(props) {
	const { classes } = props;

	return (
		<Grid item xs={12} md={3} className={classes.mentorContainer}>
			<Grid className={`${classes.homeContainer}`}>
				<Grid container justify="space-between">
					<Box className="title">
						<Typography>
							Morning Calls
                      </Typography>
						<Box className="specialBorderDetail"></Box>
					</Box>
				</Grid>
				<Grid container>
					{props.morningCalls.map((call, i) =>
						<Grid key={call.id} container className={classes.tableRow}>
							<Grid item className={classes.morningCall}>
								{/* <video className="video-container video-container-overlay" autoPlay="" loop="" muted="" data-reactid=".0.1.0.0">
                                    <source type="video/mp4" data-reactid=".0.1.0.0.0" src={call.links[2].href} />
                                </video> */}
								<iframe
									src={call.links[2].href}
									frameBorder='0'
									width='100%'
									title={call.title}
									allow='encrypted-media'
									allowFullScreen
								/>
								<Typography align="left">
									{call.title}
								</Typography>
								{/* <Typography align="left" className='subtext'>
									{call.data}
								</Typography> */}
								<Typography align="left" className='subtext'>
									{call.description}
								</Typography>
							</Grid>
						</Grid>
					)}
					<Grid container justify="flex-end">
						<ArrowForwardIos className={classes.nextPageIcon} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(MorningCalls);
