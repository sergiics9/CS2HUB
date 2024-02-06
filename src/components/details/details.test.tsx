import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Details } from './details';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockStore = configureMockStore();

describe('Given Details component', () => {
  describe('When we instantiate', () => {
    const rarities = [
      'Covert',
      'Mil-Spec Grade',
      'Extraordinary',
      'Restricted',
      'Classified',
      'Other',
    ];
    rarities.forEach((rarity) => {
      test('Then it should render correctly with a current skin', () => {
        const store = mockStore({
          skinsState: {
            currentSkin: {
              name: 'Test Skin',
              rarity: rarity,
              description: 'Test Description',
              category: 'Test Category',
              image: { url: 'test-url' },
              collections_name: 'Test Collection',
              case_name: 'Test Case',
              collections_image: { publicId: 'test-publicId' },
              case_image: { publicId: 'test-publicId' },
            },
          },
        });

        render(
          <Router>
            <Provider store={store}>
              <Details />
            </Provider>
          </Router>
        );

        expect(screen.getByText('Test Skin')).toBeInTheDocument();
        expect(screen.getByText(rarity)).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test Category')).toBeInTheDocument();
        expect(screen.getByText('Test Collection')).toBeInTheDocument();
        expect(screen.getByText('Test Case')).toBeInTheDocument();
      });
    });
  });
});
