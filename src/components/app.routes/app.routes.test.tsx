import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AppRoutes } from './app.routes';

describe('Given AppRoutes component', () => {
  describe('When we navigate to List page', () => {
    const MockedHomeComponent = jest.fn().mockReturnValue(<h1>Home</h1>);
    jest.mock('../list/list', () => MockedHomeComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Home');
    });
    test('Then the component should been called', () => {
      expect(MockedHomeComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Details page', () => {
    const MockedDetailsComponent = jest.fn().mockReturnValue(<h1>Details</h1>);
    jest.mock('../../pages/details', () => MockedDetailsComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/details/:id']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Details');
    });
    test('Then the component should been called', () => {
      expect(MockedDetailsComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Login page', () => {
    const MockedLoginComponent = jest.fn().mockReturnValue(<h1>Login</h1>);
    jest.mock('../../pages/login', () => MockedLoginComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/login']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Login');
    });
    test('Then the component should been called', () => {
      expect(MockedLoginComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Register page', () => {
    const MockedRegisterComponent = jest
      .fn()
      .mockReturnValue(<h1>Register</h1>);
    jest.mock('../../pages/register', () => MockedRegisterComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/register']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Register');
    });
    test('Then the component should been called', () => {
      expect(MockedRegisterComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to AddSkin page', () => {
    const MockedAddSkinComponent = jest.fn().mockReturnValue(<h1>Add Skin</h1>);
    jest.mock('../../pages/add.skin', () => MockedAddSkinComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/add-skin']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Add Skin');
    });
    test('Then the component should been called', () => {
      expect(MockedAddSkinComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to ModifySkin page', () => {
    const MockedModifySkinComponent = jest
      .fn()
      .mockReturnValue(<h1>Modify Skin</h1>);
    jest.mock('../../pages/modify.skin', () => MockedModifySkinComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/modify-skin/:id']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Modify Skin');
    });
    test('Then the component should been called', () => {
      expect(MockedModifySkinComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to ModifySkin page', () => {
    const MockedErrorComponent = jest
      .fn()
      .mockReturnValue(<h1>404 | NOT FOUND</h1>);
    jest.mock('../../pages/error', () => MockedErrorComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/*']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>
        );
      });
      element = screen.getByText('404 | NOT FOUND');
    });
    test('Then the component should been called', () => {
      expect(MockedErrorComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
