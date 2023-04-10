import { useGetSpecialitiesQuery } from 'redux/api/authApi';
import { Option } from 'redux/api/types';

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
