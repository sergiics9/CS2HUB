import { LoginUser, User } from '../../entities/user';
import { ApiRepoUsers } from './api.repo.users';
import { LoginResponse } from '../../types/login.response';

describe('Given repo class', () => {
  let jsonMock: jest.Mock;
  describe('When we instantiate getUsers with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const expected: User[] = [];
      const repo = new ApiRepoUsers();
      const result = await repo.getUsers();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getUsers and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getCountry should throw an error', async () => {
      const repo = new ApiRepoUsers();
      await expect(repo.getUsers()).rejects.toThrow();
    });
  });

  describe('When we instantiate createUser with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as User);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const newUser = {
        name: 'Test',
      } as unknown as Partial<User>;
      const expected: User = {} as User;
      const repo = new ApiRepoUsers();
      const result = await repo.createUser(newUser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate createUser and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const newUser = {
        name: 'Test',
      } as unknown as Partial<User>;
      const repo = new ApiRepoUsers();
      await expect(repo.createUser(newUser)).rejects.toThrow();
    });
  });

  describe('When we instantiate loginUser with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as LoginResponse);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const loginUser = {
        name: 'Test',
      } as unknown as LoginUser;
      const expected: User = {} as User;
      const repo = new ApiRepoUsers();
      const result = await repo.login(loginUser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate loginUser and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const loginUser = {
        name: 'Test',
      } as unknown as LoginUser;
      const repo = new ApiRepoUsers();
      await expect(repo.login(loginUser)).rejects.toThrow();
    });
  });

  describe('When we instantiate loginWithTokenUser with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as LoginResponse);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const token = 'aaa';
      const expected: User = {} as User;
      const repo = new ApiRepoUsers();
      const result = await repo.loginWithToken(token);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate loginWithTokenUser and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const token = 'aaa';
      const repo = new ApiRepoUsers();
      await expect(repo.loginWithToken(token)).rejects.toThrow();
    });
  });

  describe('When we instantiate updateUser with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as User);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const userId = '1';
      const updateduser = {
        name: 'Test',
      } as unknown as User;
      const expected: User = {} as User;
      const repo = new ApiRepoUsers();
      const result = await repo.updateUser(userId, updateduser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate updateUser and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const userId = '1';
      const updateduser = {
        name: 'Test',
      } as unknown as User;
      const repo = new ApiRepoUsers();
      await expect(repo.updateUser(userId, updateduser)).rejects.toThrow();
    });
  });
});
