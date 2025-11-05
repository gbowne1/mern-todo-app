import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const login = (credentials) => dispatch(loginUser(credentials));
  const signOut = () => dispatch(logout());

  return {
    user,
    loading,
    error,
    login,
    signOut,
    isAuthenticated: !!user,
  };
};

export default useAuth;
