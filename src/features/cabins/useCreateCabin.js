import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useCreateCabin = reset => {
  const queryClient = useQueryClient();

  // Mutations
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData, _ }) => createEditCabin(newCabinData), // here we don't need to pass id that's why use "_" to handle supabase server error
    onSuccess: () => {
      toast.success('New Cabin successfully created.');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message)
  });

  return { isCreating, createCabin };
};

export default useCreateCabin;
