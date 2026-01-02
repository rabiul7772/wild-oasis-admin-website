import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router';

const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  const { data: bookings, isPending } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter })
  });

  return { bookings, isPending };
};

export default useBookings;
