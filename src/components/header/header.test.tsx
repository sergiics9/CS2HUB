import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { appStore } from '../../store/store';

describe('Given...', () => {
  render(
    <Router>
      <Provider store={appStore}>
        <Header></Header>
      </Provider>
    </Router>
  );
  describe('When we instantiate', () => {
    test('Then it should be in the document', () => {
      const element = screen.getByRole('banner');
      expect(element).toBeInTheDocument();
    });
  });
});
