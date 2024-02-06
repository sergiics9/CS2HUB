import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Card } from './card';
import '@testing-library/jest-dom';
import { Skin } from '../../entities/skin';
import { appStore } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { useSkins } from '../../hooks/skins/use.skins';

jest.mock('../../hooks/skins/use.skins', () => ({
  useSkins: jest.fn().mockReturnValue({
    deleteSkin: jest.fn(),
    loadSkins: jest.fn(),
    handleCurrentSkin: jest.fn(),
  }),
}));

jest.mock('../../hooks/users/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: { name: 'Sergi', role: 'Admin' },
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({
    isConfirmed: true,
  }),
}));

//

describe('Given Card component', () => {
  const rarities = [
    'Covert',
    'Mil-Spec Grade',
    'Extraordinary',
    'Restricted',
    'Classified',
    'Other',
  ];

  rarities.forEach((rarity) => {
    const skin = {
      id: '1',
      name: 'Test Skin',
      rarity: rarity,
      category: 'Rifle',
      image: { url: 'test-url' },
      case_image: { publicId: 'test-publicId' },
      case_name: 'Test Case',
      price: '100',
      description: 'Test Description',
      collections_name: 'Test Collection',
      collections_image: { publicId: 'test-publicId' },
    } as unknown as Skin;

    describe('When we instantiate', () => {
      test('Then it should render correctly', () => {
        const { getByText, getByAltText } = render(
          <Provider store={appStore}>
            <Router>
              <Card skin={skin} />
            </Router>
          </Provider>
        );

        expect(getByText('Test Skin')).toBeInTheDocument();
        expect(getByText(rarity)).toBeInTheDocument();
        expect(getByText('Rifle')).toBeInTheDocument();
        expect(getByAltText(`imagen de ${skin.name}`)).toBeInTheDocument();
        expect(getByText('Test Case')).toBeInTheDocument();
        // expect(getByText('Show Details')).toBeInTheDocument();
        // expect(getByText('+ Add to cart')).toBeInTheDocument();
      });

      test('Then it should call handleDelete when delete button is clicked', async () => {
        render(
          <Provider store={appStore}>
            <Router>
              <Card skin={skin} />
            </Router>
          </Provider>
        );

        const deleteButton = screen.getAllByRole('button');
        await userEvent.click(deleteButton[1]);
        expect(useSkins().deleteSkin).toHaveBeenCalled();
        expect(screen.getByText(rarity)).toBeInTheDocument();
      });
      test('Then it should call handleCurrentSkin when skin image is clicked', async () => {
        const { handleCurrentSkin } = useSkins();
        render(
          <Provider store={appStore}>
            <Router>
              <Card skin={skin} />
            </Router>
          </Provider>
        );

        const skinImage = screen.getByAltText('Modify image');

        const skinImage2 = screen.getByAltText(`imagen de ${skin.name}`);

        await userEvent.click(skinImage);
        await userEvent.click(skinImage2);

        expect(handleCurrentSkin).toHaveBeenCalledWith(skin);
      });
    });
  });
});
