import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorPage } from './error';

describe('Given Header component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(<ErrorPage></ErrorPage>);
    });

    test('Then it should be the role', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
