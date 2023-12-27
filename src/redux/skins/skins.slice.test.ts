import { Skin } from '../../entities/skin';
import skinsReducer, { SkinsState } from './skins.slice';
import {
  createSkinThunk,
  deleteSkinThunk,
  updateSkinsThunk,
} from './skins.thunk';

describe('Given skinsReducer', () => {
  describe(' When skins/setCurrentSkin action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const mockSkin = { name: 'NameTest' } as unknown as Skin;
      const action = {
        type: 'skins/setCurrentSkin',
        payload: mockSkin,
      };
      const state: SkinsState = {} as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.currentSkin).toBe(mockSkin);
    });
    test('Then the new state will be returned ', () => {
      const mockSkin = '1';
      const action = {
        type: 'skins/setSelectedValue',
        payload: mockSkin,
      };
      const state: SkinsState = {} as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.selectedValue).toBe(mockSkin);
    });
    test('Then the new state will be returned ', () => {
      const mockSkin = [] as unknown as Skin[];
      const action = {
        type: 'skins/setFilteredSkins',
        payload: mockSkin,
      };
      const state: SkinsState = {} as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.filteredSkins).toBe(mockSkin);
    });
  });

  describe(' When skins/load/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const action = { type: 'load/pending' };
      const state: SkinsState = {} as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.skinsState).toBe('loading');
    });
  });

  test('Then the new state will be returned ', () => {
    const action = { type: 'load/rejected' };
    const state: SkinsState = {} as SkinsState;
    const result = skinsReducer(state, action);
    expect(result.skinsState).toBe('error');
  });

  test('Then the new state will be returned ', () => {
    const action = {
      type: 'load/fulfilled',
      payload: [{}] as unknown as Skin,
    };
    const state: SkinsState = {} as SkinsState;
    const result = skinsReducer(state, action);
    expect(result.skinsState).toBe('idle');
  });

  test('Then the new state will be returned ', () => {
    const mockSkin = { name: 'test' };
    const action = {
      type: 'filter/fulfilled',
      payload: mockSkin,
    };
    const state: SkinsState = {} as SkinsState;
    const result = skinsReducer(state, action);
    expect(result.skins).toBe(mockSkin);
  });

  describe('When createSkinThunk.fulfilled action is dispatched', () => {
    test('Then the new skin should be added to the state', () => {
      const mockSkin = { id: '1', name: 'NameTest' } as unknown as Skin;
      const action = {
        type: createSkinThunk.fulfilled.type,
        payload: mockSkin,
      };
      const state: SkinsState = { skins: [] } as unknown as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.skins).toContain(mockSkin);
    });
  });

  describe('When updateSkinsThunk.fulfilled action is dispatched', () => {
    test('Then the skin should be updated in the state', () => {
      const mockSkin = { id: '1', name: 'NameTest' } as unknown as Skin;
      const updatedSkin = { ...mockSkin, name: 'UpdatedName' };
      const action = {
        type: updateSkinsThunk.fulfilled.type,
        payload: updatedSkin,
      };
      const state: SkinsState = { skins: [mockSkin] } as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.skins[0]).toEqual(updatedSkin);
    });
  });

  describe('When deleteSkinThunk.fulfilled action is dispatched', () => {
    test('Then the skin should be removed from the state', () => {
      const mockSkin = { id: '1', name: 'NameTest' } as unknown as Skin;
      const action = {
        type: deleteSkinThunk.fulfilled.type,
        payload: mockSkin.id,
      };
      const state: SkinsState = { skins: [mockSkin] } as SkinsState;
      const result = skinsReducer(state, action);
      expect(result.skins).not.toContain(mockSkin);
    });
  });
});
