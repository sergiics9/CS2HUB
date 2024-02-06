import { render, screen } from '@testing-library/react';
import { useSkins } from './use.skins';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { Skin } from '../../entities/skin';

import { RootState } from '../../store/store';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest
    .fn()
    .mockReturnValue((state: RootState) => state.skinsState)
    .mockReturnValue({
      selectedValue: '',
    }),
}));

const mockNewSkin = {} as FormData;
const mockNewID = {} as Skin['id'];
const mockPartialSkin = {} as FormData;
const mockSkin = {} as Skin;
const mockEvent = {
  preventDefault: jest.fn(),
  target: { value: 'test' },
} as unknown as React.SyntheticEvent;

describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const {
      loadSkins,
      createSkin,
      updateSkin,
      handleCurrentSkin,
      handleFilter,
      deleteSkin,
    } = useSkins();

    return (
      <>
        <button onClick={() => loadSkins()}></button>
        <button onClick={() => createSkin(mockNewSkin)}> </button>
        <button onClick={() => updateSkin(mockNewID, mockPartialSkin)}></button>
        <button onClick={() => handleCurrentSkin(mockSkin)}> </button>
        <button onClick={() => deleteSkin(mockNewID)}> </button>
        <button onClick={() => handleFilter(mockEvent)}> </button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(<TestComponent></TestComponent>);
    elements = screen.getAllByRole('button');
  });

  describe('When we click button loadSkins', () => {
    test('Then the dispatch should have been called with filterSkinsThunk if selectedValue is not empty', async () => {
      await userEvent.click(elements[0]);

      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe('When we click button loadSkins and selectedValue is not empty', () => {
    test('Then the dispatch should have been called with filterSkinsThunk', async () => {
      (useSelector as jest.Mock).mockImplementation((selector) =>
        selector({
          usersState: { token: 'mockToken' },
          skinsState: { skins: [], selectedValue: 'test' },
        })
      );

      await userEvent.click(elements[0]);

      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe('When we click button createSkins', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button updateSkin', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button handleCurrentSkin', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[3]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button deleteSkin', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[4]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button deleteSkin', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[5]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});

describe('Given loadskins', () => {
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
    useSelector: jest
      .fn()
      .mockReturnValue((state: RootState) => state.skinsState)
      .mockReturnValue({
        selectedValue: 'test',
      }),
  }));

  const TestComponent = () => {
    const { loadSkins } = useSkins();

    return (
      <>
        <button onClick={() => loadSkins()}></button>
      </>
    );
  };

  let elementss: HTMLElement[];

  beforeEach(() => {
    render(<TestComponent></TestComponent>);
    elementss = screen.getAllByRole('button');
  });

  test('Then the dispatch should have been called with filterSkinsThunk', async () => {
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        usersState: { token: 'mockToken' },
        skinsState: { skins: [], selectedValue: 'test' },
      })
    );

    await userEvent.click(elementss[0]);

    expect(useDispatch).toHaveBeenCalled();
  });
});
