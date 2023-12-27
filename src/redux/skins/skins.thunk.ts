import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../../services/skins/api.repo';
import { Skin } from '../../entities/skin';

type Params = {
  repo: ApiRepo;
  newSkin: FormData;
};

export const loadSkinsThunk = createAsyncThunk<Skin[], ApiRepo>(
  'load',
  async (repo) => {
    const skins = await repo.getSkins();
    return skins;
  }
);

export const filterSkinsThunk = createAsyncThunk(
  'filter',
  async ({ repo, query }: { repo: ApiRepo; query: string }) => {
    const allSkins = await repo.querySkins(query);
    if (query === '') {
      return allSkins;
    } else {
      return allSkins.filter((skin) => skin.category === query);
    }
  }
);

export const createSkinThunk = createAsyncThunk<Skin, Params>(
  'create',
  async ({ repo, newSkin }) => {
    const finalSkin = await repo.createSkin(newSkin);
    return finalSkin;
  }
);

export const updateSkinsThunk = createAsyncThunk<
  Skin,
  {
    repo: ApiRepo;
    id: Skin['id'];
    updateSkins: FormData;
  }
>('update', async ({ repo, id, updateSkins }) => {
  const finalSkins = await repo.updateSkin(id, updateSkins);
  return finalSkins;
});

export const deleteSkinThunk = createAsyncThunk<
  Skin['id'],
  {
    repo: ApiRepo;
    id: Skin['id'];
  }
>('delete', async ({ repo, id }) => {
  await repo.deleteSkin(id);
  return id;
});
