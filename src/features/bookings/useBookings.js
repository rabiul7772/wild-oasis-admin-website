import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

const useBookings = () => {
  const { data: bookings, isPending } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  return { bookings, isPending };
};

export default useBookings;
