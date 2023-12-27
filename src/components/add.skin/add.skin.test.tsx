import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { AddSkin } from './add.skin';
import { useSkins } from '../../hooks/skins/use.skins';

jest.mock('../../hooks/skins/use.skins', () => ({
  useSkins: jest.fn().mockReturnValue({
    createSkin: jest.fn(),
  }),
}));

const setup = async () => {
  const { container } = render(
    <Router>
      <Provider store={appStore}>
        <AddSkin></AddSkin>
      </Provider>
    </Router>
  );

  const form = screen.getByRole('form');
  const input = screen.getAllByRole('textbox');
  const fileInputs = container.querySelectorAll('input[type="file"]');
  const fileInput = screen.getByTestId('file-input');
  const fileInput2 = screen.getByTestId('file-input2');
  const fileInput3 = screen.getByTestId('file-input3');
  const fileName = 'test-file.png';
  const file = new File(['(⌐□_□)'], fileName, { type: 'image.png' });

  await userEvent.type(input[0], 'test');
  await userEvent.type(input[1], 'testing');
  await userEvent.upload(fileInput, file);
  await userEvent.upload(fileInput2, file);
  await userEvent.upload(fileInput3, file);

  return { form, fileInputs, file };
};

describe(' Component', () => {
  test('Submits form with correct values', async () => {
    const { form, fileInputs, file } = await setup();

    for (const fileInput of fileInputs) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await fireEvent.submit(form);

    expect(useSkins().createSkin).toHaveBeenCalledWith(expect.any(FormData));
  });
});

describe('first', () => {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));
  test('should first', async () => {
    const { form, fileInputs, file } = await setup();

    for (const fileInput of fileInputs) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await fireEvent.submit(form);

    expect(useSkins().createSkin).toHaveBeenCalledWith(expect.any(FormData));

    const element = screen.getByAltText('Preview1');
    expect(element).toBeInTheDocument();
  });
});
