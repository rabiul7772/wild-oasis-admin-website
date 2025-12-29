import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { duplicateCabin as duplicateCabinApi } from '../../services/apiCabins';

const useDuplicateCabin = () => {
  const queryClient = useQueryClient();
  // Mutations
  const { mutate: duplicateCabin, isPending: isDuplicating } = useMutation({
    mutationFn: duplicateCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully duplicated.');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => toast.error(err.message)
  });

  return { duplicateCabin, isDuplicating };
};

export default useDuplicateCabin;
