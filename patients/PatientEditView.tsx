import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import AvatarUpload from '../common/AvatarUpload';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Panel from '../common/Panel';
import SimpleTextField from '../common/inputs/SimpleTextField';
import SimpleSelect from '../common/inputs/SimpleSelect';
import DateInput from '../common/inputs/DateInput';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    content: {
      paddingTop: spacing(4),
    },
    avatar: {
      marginTop: spacing(1.5),
      marginBottom: spacing(3),
    },
    field: {
      marginBottom: spacing(2),
      width: '100%',
    },
  })
);

interface PatientEditViewProps {
  open: boolean;
}

export default function PatientEditView(props: PatientEditViewProps): ReactElement {
  const classes = useStyles();

  return (
    <Panel
      title="Edit Info"
      titleActions={
        <Button color="primary" variant="contained">
          Save
        </Button>
      }
      close={() => console.log('close me')}
      isOpen={props.open}
      toggleDrawer={() => null}
      type="narrow"
    >
      <div className={classes.content}>
        <Typography variant="h6">Patient</Typography>
        <AvatarUpload
          className={classes.avatar}
          avatar="/images/test-avatar-patient-01-large"
          onUpload={() => console.log('upload photo')}
        />
        <div>
          <SimpleTextField className={classes.field} label="Patient ID" value={null} />
          <SimpleTextField className={classes.field} label="Email" value={null} />
          <SimpleTextField className={classes.field} label="First Name" value={null} />
          <SimpleTextField className={classes.field} label="Last Name" value={null} />
          <SimpleSelect className={classes.field} label="Doctor" item={''} list={['Bob', 'Jon']} />
          <SimpleSelect
            className={classes.field}
            label="Location"
            item={''}
            list={['USA', 'Canana']}
          />
          <SimpleTextField className={classes.field} label="Phone Number" value={null} optional />
          <DateInput
            className={classes.field}
            label="Date of Birth"
            value={null}
            onChange={() => console.log('change date')}
          />
          <SimpleTextField className={classes.field} label="Personal ID" value={null} optional />
        </div>
      </div>
    </Panel>
  );
}
