import React, { ReactElement, useEffect, useState } from 'react';
import PatientsTable from '../tables/PatientsTable';
import TableActions from '../tables/TableActions';
import TableFilters from '../tables/TableFilters';
import UserIcon from '@material-ui/icons/Person';
import { Filter } from '../tables/interfaces';
import { FilterChipProps } from '../common/interfaces';
import isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';
import { PATIENT_URL } from '../../constants/urls';
import { useIsInfinityScroll } from '../../hooks/commonHooks/useIsInfinityScroll';
import { useOffsetPage } from '../../hooks/commonHooks/useOffsetPage';
import { useFetchPatientsToTable } from '../../hooks/fetchHooks/useFetchPatientsToTable';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/interfaces';

export default function PatientsContainer(): ReactElement {
  const [filters, setFilters] = useState<Array<Filter>>([]);
  const [search, setSearch] = useState<string>('');
  const [pageNumber, setOffset] = useState<number>(0);
  const router = useRouter();
  const { scrollY } = useIsInfinityScroll();
  useOffsetPage(pageNumber, scrollY, setOffset);

  const state = useSelector((state: IRootState) => state);
  const {
    patients: { patientsList },
  } = state;

  const [preDefinedFilters, setPreDefinedFilters] = useState<Array<FilterChipProps>>([
    {
      color: '#3279A5',
      label: 'My Patients',
      icon: <UserIcon />,
      selected: false,
      filters: [
        {
          field: {
            label: 'Doctor',
            field: 'doctor',
          },
          value: {
            label: 'Charlie Curtis',
            value: '412351324',
          },
          filtersList: filters,
          setState: setFilters,
        },
      ],
      onClick: setFilters,
    },
  ]);

  useFetchPatientsToTable(filters, search, pageNumber);

  useEffect(() => {
    for (let i = 0; i < preDefinedFilters.length; i++) {
      if (isEqual(filters, preDefinedFilters[i].filters)) {
        preDefinedFilters[i].selected = true;
      } else {
        preDefinedFilters[i].selected = false;
      }
    }
    setPreDefinedFilters(preDefinedFilters);
  }, [filters]);
  const handleAddPatient = () => router.push(PATIENT_URL);
  const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setOffset(0);
  };
  return (
    <>
      <TableActions
        preDefinedFilters={preDefinedFilters}
        primaryAction={{
          label: 'New Patient',
          action: handleAddPatient,
        }}
      />
      <TableFilters filters={filters} onSearch={handleSetSearch} />
      <div>
        <PatientsTable data={patientsList} />
      </div>
    </>
  );
}
