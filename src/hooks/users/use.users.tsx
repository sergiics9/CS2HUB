import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ac } from '../../redux/users/users.slice';
import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { LoginUser, User } from '../../entities/user';
import { loginThunk, loginTokenThunk } from '../../redux/users/users.thunk';
import { Storage } from '../../services/storage';

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoUsers();
  const userStore = new Storage<{ token: string }>('user');
  const { loggedUser } = useSelector((state: RootState) => state.usersState);

  const register = (newUser: Partial<User>) => {
    repo.createUser(newUser);
  };

  const login = (loginUser: LoginUser) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const loginWithtoken = () => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const token = userStoreData.token;
      dispatch(loginTokenThunk({ token, repo, userStore }));
    }
  };

  const logout = () => {
    dispatch(ac.logout());
    userStore.remove();
  };

  return {
    logout,
    login,
    register,
    loginWithtoken,
    loggedUser,
  };
}
