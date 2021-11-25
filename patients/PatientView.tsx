import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';

import ModulesTable from '../tables/ModulesTable';
import FormsTable from '../tables/FormsTable';
import { PATIENT_ASSIGN_MODULE_URL } from '../../constants/urls';

import { IRootState } from '../../store/interfaces';
import { useFetchPatientToStore } from '../../hooks/fetchHooks/useFetchPatientToStore';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      paddingTop: spacing(3),
      paddingBottom: spacing(3),
    },
    paper: {
      padding: spacing(3),
      marginBottom: spacing(2),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${spacing(1)}px 0`,
    },
    headerText: {
      marginLeft: spacing(1),
    },
    patientHeader: {
      display: 'flex',
    },
  })
);

export default function PatientView(): ReactElement {
  const classes = useStyles();
  const selectedPatient = useSelector((state: IRootState) => state.patients.selectedPatient);
  const {
    query: { id },
    push,
  } = useRouter();

  useFetchPatientToStore(id);

  const handleAssignModule = () => push(PATIENT_ASSIGN_MODULE_URL(selectedPatient?.identifier));
  if (isEmpty(selectedPatient)) {
    return <></>;
  }
  return (
    <div className={classes.root}>
      {selectedPatient?.modules && (
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="subtitle1" className={classes.headerText}>
              Modules
            </Typography>
            <Button variant="outlined" onClick={handleAssignModule} startIcon={<AddIcon />}>
              Assign Module
            </Button>
          </div>
          <ModulesTable data={selectedPatient?.modules} />
        </Paper>
      )}
      {selectedPatient?.forms && (
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="subtitle1" className={classes.headerText}>
              Forms
            </Typography>
            <Button variant="outlined" startIcon={<AddIcon />}>
              Assign Form
            </Button>
          </div>
          <FormsTable data={selectedPatient?.forms} />
        </Paper>
      )}
    </div>
  );
}
