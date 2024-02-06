import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Skin } from '../../entities/skin';
import {
  loadSkinsThunk,
  updateSkinsThunk,
  createSkinThunk,
  deleteSkinThunk,
  filterSkinsThunk,
} from './skins.thunk';

export type SkinsState = {
  skins: Skin[];
  skinsState: 'idle' | 'loading' | 'error';
  currentSkin: Skin | null;
  filteredSkins: Skin[];
  selectedValue: string;
};

const initialState: SkinsState = {
  skins: [],
  skinsState: 'idle',
  currentSkin: null,
  filteredSkins: [],
  selectedValue: '',
};

const skinsSlice = createSlice({
  name: 'skins',
  initialState,
  reducers: {
    setCurrentSkin: (
      state: SkinsState,
      { payload }: PayloadAction<Skin | null>
    ) => {
      state.currentSkin = payload;
      return state;
    },
    setFilteredSkins: (
      state: SkinsState,
      { payload }: PayloadAction<Skin[]>
    ) => {
      state.filteredSkins = payload;
      return state;
    },
    setSelectedValue: (
      state: SkinsState,
      { payload }: PayloadAction<string>
    ) => {
      state.selectedValue = payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSkinsThunk.pending, (state: SkinsState) => {
      state.skinsState = 'loading';
      return state;
    });
    builder.addCase(
      loadSkinsThunk.fulfilled,
      (state: SkinsState, { payload }: PayloadAction<Skin[]>) => {
        state.skins = payload;
        state.skinsState = 'idle';
        return state;
      }
    );
    builder.addCase(loadSkinsThunk.rejected, (state: SkinsState) => {
      state.skinsState = 'error';
      return state;
    });
    builder.addCase(
      createSkinThunk.fulfilled,
      (state: SkinsState, { payload }: PayloadAction<Skin>) => {
        state.skins.push(payload);
        return state;
      }
    ),
      builder.addCase(
        updateSkinsThunk.fulfilled,
        (state: SkinsState, { payload }: PayloadAction<Skin>) => {
          state.skins[state.skins.findIndex((item) => item.id === payload.id)] =
            payload;
          return state;
        }
      );
    builder.addCase(
      deleteSkinThunk.fulfilled,
      (state: SkinsState, { payload }: PayloadAction<Skin['id']>) => {
        state.skins.splice(
          state.skins.findIndex((item) => item.id === payload),
          1
        );
        return state;
      }
    );
    builder.addCase(
      filterSkinsThunk.fulfilled,
      (state: SkinsState, { payload }: PayloadAction<Skin[]>) => {
        state.skins = payload;
        return state;
      }
    );
  },
});

export default skinsSlice.reducer;

export const { setCurrentSkin, setFilteredSkins, setSelectedValue } =
  skinsSlice.actions;
