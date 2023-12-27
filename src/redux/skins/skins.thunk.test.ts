import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loadSkinsThunk,
  createSkinThunk,
  updateSkinsThunk,
  deleteSkinThunk,
  filterSkinsThunk,
} from './skins.thunk';
import { ApiRepo } from '../../services/skins/api.repo';
import { Skin } from '../../entities/skin';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('skins thunks', () => {
  let store: ReturnType<typeof mockStore> & {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
  };
  let mockRepo: ApiRepo;

  beforeEach(() => {
    store = mockStore({});
    mockRepo = {
      getSkins: jest.fn().mockResolvedValue([]),
      createSkin: jest.fn().mockResolvedValue({} as Skin),
      updateSkin: jest.fn().mockResolvedValue({} as Skin),
      deleteSkin: jest.fn().mockResolvedValue([]),
    } as unknown as ApiRepo;
  });

  test('loadSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(loadSkinsThunk(mockRepo));
    const actions = store.getActions();
    expect(actions[0].type).toBe('load/pending');
    expect(actions[1].type).toBe('load/fulfilled');
  });

  test('createSkinThunk dispatches the correct actions', async () => {
    await store.dispatch(
      createSkinThunk({ repo: mockRepo, newSkin: new FormData() })
    );
    const actions = store.getActions();
    expect(actions[0].type).toBe('create/pending');
    expect(actions[1].type).toBe('create/fulfilled');
  });

  test('updateSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(
      updateSkinsThunk({ repo: mockRepo, id: '1', updateSkins: new FormData() })
    );
    const actions = store.getActions();
    expect(actions[0].type).toBe('update/pending');
    expect(actions[1].type).toBe('update/fulfilled');
  });

  test('deleteSkinThunk dispatches the correct actions', async () => {
    await store.dispatch(deleteSkinThunk({ repo: mockRepo, id: '1' }));
    const actions = store.getActions();
    expect(actions[0].type).toBe('delete/pending');
    expect(actions[1].type).toBe('delete/fulfilled');
  });

  test('filterSkinsThunk dispatches the correct actions', async () => {
    mockRepo.querySkins = jest
      .fn()
      .mockResolvedValue([
        { category: 'q' } as Skin,
        { category: 'other' } as Skin,
      ]);

    await store.dispatch(filterSkinsThunk({ repo: mockRepo, query: 'q' }));
    const actions = store.getActions();

    expect(actions[1].type).toBe('filter/fulfilled');
    expect(actions[1].payload).toEqual([{ category: 'q' }]);
  });
  test('filterSkinsThunk dispatches the correct actions', async () => {
    mockRepo.querySkins = jest
      .fn()
      .mockResolvedValue([{ category: '' } as Skin]);

    await store.dispatch(filterSkinsThunk({ repo: mockRepo, query: '' }));
    const actions = store.getActions();

    expect(actions[1].type).toBe('filter/fulfilled');
    expect(actions[1].payload).toEqual([{ category: '' }]);
  });
});
