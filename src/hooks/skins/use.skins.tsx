import { SyntheticEvent, useCallback, useMemo } from 'react';
import { ApiRepo } from '../../services/skins/api.repo';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSkinThunk,
  deleteSkinThunk,
  filterSkinsThunk,
  loadSkinsThunk,
  updateSkinsThunk,
} from '../../redux/skins/skins.thunk';
import { AppDispatch, RootState } from '../../store/store';
import { Skin } from '../../entities/skin';
import {
  setCurrentSkin,
  setSelectedValue,
} from '../../redux/skins/skins.slice';

export function useSkins() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.usersState);
  const { skins, currentSkin, filteredSkins, selectedValue } = useSelector(
    (state: RootState) => state.skinsState
  );
  const repo = useMemo(() => new ApiRepo(token), []);

  const loadSkins = useCallback(async () => {
    try {
      if (selectedValue === '') {
        dispatch(loadSkinsThunk(repo));
      } else {
        dispatch(filterSkinsThunk({ repo, query: selectedValue }));
      }
    } catch (error) {
      // console.log((error as Error).message);
    }
  }, [repo, selectedValue]);

  const createSkin = async (newSkin: FormData) => {
    try {
      dispatch(
        createSkinThunk({
          repo,
          newSkin,
        })
      );
    } catch (error) {
      // console.log((error as Error).message);
    }
  };

  const updateSkin = async (id: Skin['id'], updateSkins: FormData) => {
    try {
      dispatch(updateSkinsThunk({ id, repo, updateSkins }));
    } catch (error) {
      // console.log((error as Error).message);
    }
  };

  const handleCurrentSkin = async (skin: Skin) => {
    dispatch(setCurrentSkin(skin));
  };

  const deleteSkin = async (id: Skin['id']) => {
    try {
      dispatch(
        deleteSkinThunk({
          id,
          repo,
        })
      );
    } catch (error) {
      // console.log((error as Error).message);
    }
  };

  const handleFilter = (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLInputElement;
    const value = element.value;
    dispatch(setSelectedValue(value));
    dispatch(filterSkinsThunk({ repo, query: value }));
  };

  return {
    loadSkins,
    filteredSkins,
    updateSkin,
    handleCurrentSkin,
    createSkin,
    deleteSkin,
    skins,
    currentSkin,
    handleFilter,
    selectedValue,
  };
}
