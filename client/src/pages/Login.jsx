import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { TextField, Button, Typography, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5"><LockOutlinedIcon /> Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" fullWidth disabled={isLoading}>Login</Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Box>
  );
};

export default Login;
