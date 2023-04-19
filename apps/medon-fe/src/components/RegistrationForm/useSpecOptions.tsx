import { useGetSpecialitiesQuery } from 'redux/api/authApi';
// import { useEffect } from 'react';
// import { setSpecialities } from 'redux/features/specialitySlice/specialitySlice';
// import { useAppDispatch } from 'redux/hooks';

export interface Option {
  value: string | number;
  label: string;
}

const emptyArray: Option[] = [];

const useSpecOptions = () => {
  // const dispatch = useAppDispatch();
  const specialityOptions = useGetSpecialitiesQuery(null, {
    selectFromResult: ({ data }) => ({
      specialityOptions: data
        ? data.map((elem) => ({ value: elem.id, label: elem.name }))
        : emptyArray,
    }),
  });
  // useEffect(() => {
  //   dispatch(setSpecialities(specialityOptions.specialityOptions));
  // }, [dispatch, specialityOptions]);

  return specialityOptions;
};

export default useSpecOptions;
