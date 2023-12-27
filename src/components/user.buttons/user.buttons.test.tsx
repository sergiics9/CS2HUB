import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserButtons } from './user.buttons';
import { useUsers } from '../../hooks/users/use.users';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { User } from '../../entities/user';
import Swal from 'sweetalert2';

jest.mock('../../hooks/users/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    logout: jest.fn(),
    loggedUser: { name: 'Test User', role: 'Admin' },
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

describe('UserButtons', () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={appStore}>
          <UserButtons />
        </Provider>
      </Router>
    );
  });
  test('calls Swal.fire when logout button is clicked', () => {
    const logoutButton = screen.getAllByRole('button', {
      name: /Logout image/i,
    });
    fireEvent.click(logoutButton[0]);
    expect(Swal.fire).toHaveBeenCalled();
  });
});

test('renders logout button and welcome message when user is logged in', () => {
  (useUsers as jest.Mock).mockReturnValue({
    loggedUser: { name: 'test' } as unknown as User,
    logout: jest.fn(),
  });

  render(
    <Router>
      <Provider store={appStore}>
        <UserButtons />
      </Provider>
    </Router>
  );

  const welcomeContainer = screen.getByRole('heading');

  expect(welcomeContainer).toBeInTheDocument();
});
test('renders logout button and welcome message when user is logged in', () => {
  (useUsers as jest.Mock).mockReturnValue({
    loggedUser: { role: 'Admin' } as unknown as User,
    logout: jest.fn(),
  });

  render(
    <Router>
      <Provider store={appStore}>
        <UserButtons />
      </Provider>
    </Router>
  );

  const welcomeContainer = screen.getByAltText('Add image');

  expect(welcomeContainer).toBeInTheDocument();
});

test('renders logout button and welcome message when user is logged in', () => {
  (useUsers as jest.Mock).mockReturnValue({
    loggedUser: null,
    logout: jest.fn(),
  });

  render(
    <Router>
      <Provider store={appStore}>
        <UserButtons />
      </Provider>
    </Router>
  );

  const welcomeContainer = screen.getByAltText('Login image');

  expect(welcomeContainer).toBeInTheDocument();
});
