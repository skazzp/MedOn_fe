import { useGetSpecialitiesQuery } from 'redux/api/authApi';

interface Option {
  value: string | number;
  label: string;
}

const emptyArray: Option[] = [];

const useSpecOptions = () => {
  const specialityOptions = useGetSpecialitiesQuery(null, {
    skip: false,
    selectFromResult: ({ data }) => ({
      specialityOptions: data
        ? data.map((elem) => {
            const option = { value: elem.id, label: elem.name };
            return option;
          })
        : emptyArray,
    }),
  });
  return specialityOptions;
};

export default useSpecOptions;
