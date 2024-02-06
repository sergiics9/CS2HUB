import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { ModifySkin } from './modify.skin';

jest.mock('../../hooks/skins/use.skins', () => ({
  useSkins: jest.fn().mockReturnValue({
    updateSkin: jest.fn(),
  }),
}));

const setup = async () => {
  const { container } = render(
    <Router>
      <Provider store={appStore}>
        <ModifySkin></ModifySkin>
      </Provider>
    </Router>
  );

  const form = screen.getByRole('form');
  const input = screen.getAllByRole('textbox');
  const fileInputs = container.querySelectorAll('input[type="file"]');
  const fileName = 'test-file.png';
  const file = new File([''], fileName, { type: 'image.png' });

  await userEvent.type(input[0], 'test');
  await userEvent.type(input[1], 'testing');

  for (const fileInput of fileInputs) {
    await userEvent.upload(fileInput as HTMLElement, file);
    fireEvent.change(fileInput as HTMLElement, { target: { files: [file] } });
  }

  return { form, container, fileInputs };
};

describe('Component must...', () => {
  test('Submits form with correct values', async () => {
    const { form } = await setup();
    await fireEvent.submit(form);
  });
});

describe('first', () => {
  test('should first', async () => {
    const { form } = await setup();

    await fireEvent.submit(form);

    const element = screen.getByAltText('Preview1');
    expect(element).toBeInTheDocument();
  });
});
