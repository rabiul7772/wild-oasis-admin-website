import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useEditCabin = reset => {
  const queryClient = useQueryClient();

  // Mutations
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(' Cabin successfully edited.');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message)
  });

  return { isEditing, editCabin };
};

export default useEditCabin;
