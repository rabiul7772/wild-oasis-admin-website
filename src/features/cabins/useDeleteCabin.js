import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  // Mutations
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted.');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => toast.error(err.message)
  });

  return { deleteCabin, isDeleting };
};

export default useDeleteCabin;
