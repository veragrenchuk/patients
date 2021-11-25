import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import dayjs from 'dayjs';

import PatientInfoSection from './PatientInfoSection';
import { IPatient } from '../../store/interfaces/patients.interfaces';
import { IRootState } from '../../store/interfaces';
import { useFetchPatientToStore } from '../../hooks/fetchHooks/useFetchPatientToStore';
import { getInitials } from '../../utils/getInitials';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      paddingTop: spacing(3),
      paddingBottom: spacing(3),
    },
  })
);

export default function PatientView(): ReactElement {
  const classes = useStyles();
  const selectedPatient = useSelector((state: IRootState) => state.patients.selectedPatient);
  const {
    query: { id },
  } = useRouter();

  useFetchPatientToStore(id);

  if (isEmpty(selectedPatient)) {
    return <></>;
  }
  return (
    <div className={classes.root}>
      <PatientInfoSection
        heading="Patient"
        data={formatPatient(selectedPatient)}
        avatar={{
          src: `${process.env.NEXT_PUBLIC_HOST}${selectedPatient.picture?.fileAsset.idPath}`,
          initials: getInitials(selectedPatient.firstName, selectedPatient.lastName),
        }}
      />
      {selectedPatient.partner && (
        <PatientInfoSection
          heading="Partner"
          data={formatPatient(selectedPatient.partner)}
          avatar={{
            src: `${process.env.NEXT_PUBLIC_HOST}${selectedPatient.partner.picture?.fileAsset.idPath}`,
            initials: getInitials(
              selectedPatient.partner.firstName,
              selectedPatient.partner.lastName
            ),
          }}
        />
      )}
    </div>
  );
}

const formatPatient = (patient: IPatient) => {
  const date = dayjs(patient.dateOfBirth ? patient.dateOfBirth : '').format('MMM DD, YYYY');
  const doc = patient.doctor ? `${patient.doctor?.firstName} ${patient.doctor?.lastName}` : '';
  return [
    { label: 'Patient ID', value: patient.mpi },
    { label: 'Email', value: patient.email },
    { label: 'First Name', value: patient.firstName },
    { label: 'Last Name', value: patient.lastName },
    { label: 'Doctor', value: doc },
    { label: 'Location', value: patient.location },
    { label: 'Phone Number', value: patient.phone },
    { label: 'Date of Birth', value: date },
    { label: 'Personal ID', value: patient.personalId },
  ];
};
