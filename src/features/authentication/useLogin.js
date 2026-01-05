import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: user => {
      console.log(user);
      navigate('/');
    },
    onError: err => toast.error(err.message)
  });

  return { login, isPending };
};

export default useLogin;
