import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoField from './InfoField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PatientEditView from './PatientEditView';
import Typography from '@material-ui/core/Typography';

import MoreIcon from '@material-ui/icons/MoreVert';
import { PatientInfoSectionProps } from './interfaces';

const useStyles = makeStyles(({ spacing, typography }: Theme) =>
  createStyles({
    root: {
      paddingTop: spacing(3),
      paddingBottom: spacing(3),
    },
    avatar: {
      width: spacing(13),
      height: spacing(13),
      fontSize: typography.pxToRem(24),
    },
    paper: {
      padding: spacing(3),
      marginBottom: spacing(2),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 14,
    },
    headerText: {
      marginLeft: spacing(2),
    },
    details: {
      padding: 12,
    },
  })
);

export default function PatientViewSection(props: PatientInfoSectionProps): ReactElement {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenEdit(true);
    setAnchorEl(null);
  };

  const renderFields = (which: 'even' | 'odd') => {
    if (which === 'even')
      return props.data.map((elem, i) => {
        if (i % 2 === 0)
          return <InfoField key={i} label={elem.label} value={elem.value ? elem.value : ''} />;
      });
    else
      return props.data.map((elem, i) => {
        if (i % 2 !== 0)
          return <InfoField key={i} label={elem.label} value={elem.value ? elem.value : ''} />;
      });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h6" className={classes.headerText}>
            {props.heading}
          </Typography>
          <IconButton onClick={handleClick} aria-haspopup="true" aria-controls="simple-menu">
            <MoreIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
          </Menu>
        </div>
        <Grid container spacing={8} className={classes.details}>
          <Grid item sm={2}>
            <Avatar src={props.avatar.src} className={classes.avatar}>
              {props.avatar.initials}
            </Avatar>
          </Grid>
          <Grid item sm={3}>
            {renderFields('even')}
          </Grid>
          <Grid item sm={3}>
            {renderFields('odd')}
          </Grid>
        </Grid>
      </Paper>
      <PatientEditView open={openEdit} />
    </>
  );
}
