import { fireEvent, render, screen } from '@testing-library/react';
import { Login } from './login';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { useUsers } from '../../hooks/users/use.users';

jest.mock('../../hooks/users/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    login: jest.fn(),
  }),
}));

describe('Login Component', () => {
  render(
    <Router>
      <Provider store={appStore}>
        <Login></Login>
      </Provider>
    </Router>
  );
  test('Then it submits form with correct values', async () => {
    const form = screen.getByRole('form');
    const input = screen.getAllByRole('textbox');
    await userEvent.type(input[0], 'test');
    await userEvent.click(screen.getByRole('button'));
    await fireEvent.submit(form);
    expect(useUsers().login).toHaveBeenCalled();
  });
});
