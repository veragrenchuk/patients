import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { InfoFieldProps } from './interfaces';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      marginBottom: spacing(2),
    },
    label: {
      marginBottom: 1,
    },
  })
);

export default function InfoField(props: InfoFieldProps): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary" className={classes.label}>
        {props.label}
      </Typography>
      <Typography variant="body2">{props.value}</Typography>
    </div>
  );
}
