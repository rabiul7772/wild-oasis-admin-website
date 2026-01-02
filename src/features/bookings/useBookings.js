import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router';

const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const sortValue = searchParams.get('sortBy') || 'startDate_desc';

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  const [field, direction] = sortValue.split('_');

  const sortBy = {
    field,
    direction
  };

  const { data: bookings, isPending } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy })
  });

  return { bookings, isPending };
};

export default useBookings;
