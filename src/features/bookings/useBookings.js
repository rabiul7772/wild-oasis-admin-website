import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router';
import { PAGE_SIZE } from '../../utils/constant';

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get('status');
  const sortValue = searchParams.get('sortBy') || 'startDate_desc';

  // FILTER

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  const [field, direction] = sortValue.split('_');

  //SORT

  const sortBy = {
    field,
    direction
  };

  // PAGINATION

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data, isPending, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  const bookings = data?.data || [];
  const count = data?.count || 0;

  //PRE -FETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });

  return { bookings, count, isPending, error };
};

export default useBookings;
