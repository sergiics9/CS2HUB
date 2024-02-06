import { fireEvent, render, screen } from '@testing-library/react';
import { Register } from './register';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { useUsers } from '../../hooks/users/use.users';
import Swal from 'sweetalert2';

jest.mock('../../hooks/users/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    register: jest.fn(),
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Register Component', () => {
  render(
    <Router>
      <Provider store={appStore}>
        <Register></Register>
      </Provider>
    </Router>
  );
  test('Then it submits form with correct values', async () => {
    const form = screen.getByRole('form');
    const input = screen.getAllByRole('textbox');
    await userEvent.type(input[0], 'test');
    await userEvent.type(input[1], 'testing');
    await userEvent.type(input[2], 'test@example.com');
    await userEvent.click(screen.getByRole('button'));
    await fireEvent.submit(form);
    expect(Swal.fire).toHaveBeenCalled();
    expect(useUsers().register).toHaveBeenCalled();
  });
});
