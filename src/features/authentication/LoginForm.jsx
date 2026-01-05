import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';
import useLogin from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          disabled={isPending}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled={isPending}
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary" disabled={isPending}>
          {isPending ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
