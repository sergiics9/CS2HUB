import usersReducer, { UsersState } from './users.slice';

describe('Given usersReducer', () => {
  let state: UsersState = {} as UsersState;
  describe('When users/logout action is dispatch', () => {
    test('Then the new state will be returned', () => {
      const action = {
        type: 'users/logout',
      };
      const result = usersReducer(state, action);
      expect(result.loggedUser).toBe(null);
      expect(result.token).toBe('');
    });
  });

  describe('When users/login action is dispatch', () => {
    test('Then the new state will be returned', () => {
      const action = {
        type: 'login/rejected',
      };

      const result = usersReducer(state, action);
      expect(result.loginState).toBe('error');
    });
  });
});
