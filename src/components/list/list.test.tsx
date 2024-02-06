import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useSkins } from '../../hooks/skins/use.skins';
import List from './list';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { appStore } from '../../store/store';

jest.mock('../../hooks/skins/use.skins', () => ({
  useSkins: jest.fn().mockReturnValue({
    loadSkins: jest.fn(),
    skins: [{ case_image: { publicId: '1' }, image: { url: '1' } }],
  }),
}));

describe('List', () => {
  test('calls loadSkins on mount and renders cards for each skin', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <List></List>
        </Provider>
      </Router>
    );

    const list = screen.getByRole('list');
    const footer = screen.getByRole('contentinfo');
    expect(useSkins().loadSkins).toHaveBeenCalled();
    expect(list).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
