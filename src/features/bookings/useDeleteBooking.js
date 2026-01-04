import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  // Mutations
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully deleted.');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: err => toast.error(err.message)
  });

  return { deleteBooking, isDeleting };
};

export default useDeleteBooking;
