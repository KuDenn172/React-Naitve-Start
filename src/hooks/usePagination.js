import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

export default function usePagination(
  keyArr = [],
  callFunc = () => {},
  {keyQuery} = {},
) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const {data, isFetching, ...props} = useQuery({
    queryKey: [...keyArr, page],
    queryFn: () => callFunc({page, ...keyQuery}),
    placeholderData: placeData => {
      queryClient.invalidateQueries({
        queryKey: [...keyArr, page + 1],
        queryFn: () => callFunc({...keyQuery, page: page + 1}),
      });
      return placeData;
    },
  });

  const dataStart = [...Array(10)];

  return {
    data,
    dataStart,
    page,
    setPage,
    ...props,
  };
}
