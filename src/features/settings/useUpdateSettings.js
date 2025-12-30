import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

const useUpdateSettings = reset => {
  const queryClient = useQueryClient();

  // Mutations
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success(' Settings successfully updated.');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      reset();
    },
    onError: err => toast.error(err.message)
  });

  return { isUpdating, updateSettings };
};

export default useUpdateSettings;
