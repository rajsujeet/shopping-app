import { useMemo } from 'react'
import { selectCurrentUser } from '../redux/features/authSlice';
import { useTypedSelector } from '../redux/store';

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [user]);
}
  