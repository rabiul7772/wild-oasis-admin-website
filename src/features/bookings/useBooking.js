import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router';

const useBooking = () => {
  const { bookingId } = useParams();

  const { data: booking, isPending } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false
  });

  return { booking, isPending };
};

export default useBooking;
