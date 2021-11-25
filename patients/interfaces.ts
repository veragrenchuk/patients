import { AvatarProps } from '../common/interfaces';

export interface InfoFieldProps {
  label: string;
  value: string | undefined;
}

export interface PatientInfoSectionProps {
  heading: string;
  data: Array<InfoFieldProps>;
  avatar: AvatarProps;
}
