import { useGetSpecialitiesQuery } from 'redux/api/authApi';

export interface Option {
  value: string | number;
  label: string;
}

const emptyArray: Option[] = [];

const useSpecOptions = () => {
  const { specialityOptions } = useGetSpecialitiesQuery(null, {
    selectFromResult: ({ data }) => ({
      specialityOptions: data
        ? data.map((elem) => ({ value: elem.id, label: elem.name }))
        : emptyArray,
    }),
  });

  return { specialityOptions };
};

export default useSpecOptions;
