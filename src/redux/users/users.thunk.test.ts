import { LoginUser } from '../../entities/user';
import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { Storage } from '../../services/storage';
import { appStore } from '../../store/store';
import { loginThunk, loginTokenThunk } from './users.thunk';

describe('Given...', () => {
  describe('When...', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
        loginWithToken: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as ApiRepoUsers,
      userStore: {
        set: jest.fn(),
      } as unknown as Storage<{
        token: string;
      }>,
    };

    test('Then it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };
      await appStore.dispatch(loginThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalled();
      data.repo.login;
    });
    test('Then it should ...', async () => {
      const data = { ...sharedData, token: '' };
      await appStore.dispatch(loginTokenThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
      expect(data.userStore.set).toHaveBeenCalled();
      data.repo.login;
    });
  });
});
