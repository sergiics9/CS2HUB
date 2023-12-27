import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/login.response';
import { LoginUser } from '../../entities/user';
import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { Storage } from '../../services/storage';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginUser: LoginUser;
    repo: ApiRepoUsers;
    userStore: Storage<{ token: string }>;
  }
>('login', async ({ loginUser, repo, userStore }) => {
  const loginResponse = await repo.login(loginUser);
  userStore.set({ token: loginResponse.token });
  return loginResponse;
});

export const loginTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: ApiRepoUsers;
    userStore: Storage<{ token: string }>;
  }
>('loginWithToken', async ({ token, repo, userStore }) => {
  const loginResponse = await repo.loginWithToken(token);
  userStore.set({ token: loginResponse.token });
  return loginResponse;
});
