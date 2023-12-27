import { Skin } from '../../entities/skin';
import { ApiRepo } from './api.repo';

describe('Given ApiRepo class', () => {
  let jsonMock: jest.Mock;
  const token = 'test-token';
  const mockQuery = {
    query: '',
  };

  describe('When we call getSkins', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then fetch should be called and return an array', async () => {
      const expected: Skin[] = [];
      const repo = new ApiRepo(token);
      const result = await repo.getSkins();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });

    test('Then fetch should be called and return an array', async () => {
      const expected: Skin[] = [];

      const repo = new ApiRepo(token);
      const result = await repo.querySkins(mockQuery.query);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });

  describe('When we call getSkins and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then getSkins should throw an error', async () => {
      const repo = new ApiRepo(token);
      await expect(repo.getSkins()).rejects.toThrow();
    });
    test('Then getSkins should throw an error', async () => {
      const repo = new ApiRepo(token);
      await expect(repo.querySkins(mockQuery.query)).rejects.toThrow();
    });
  });

  describe('When we call createSkin', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Skin);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then fetch should be called and return a Skin', async () => {
      const newSkin = new FormData();
      const expected: Skin = {} as Skin;
      const repo = new ApiRepo(token);
      const result = await repo.createSkin(newSkin);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });

  describe('When we call createSkin and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then createSkin should throw an error', async () => {
      const newSkin = new FormData();
      const repo = new ApiRepo(token);
      await expect(repo.createSkin(newSkin)).rejects.toThrow();
    });
  });

  describe('When we call updateSkin', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Skin);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then fetch should be called and return a Skin', async () => {
      const skinId = '1';
      const updatedSkin = {
        name: 'Updated Skin',
      } as unknown as FormData;
      const expected: Skin = {} as Skin;
      const repo = new ApiRepo(token);
      const result = await repo.updateSkin(skinId, updatedSkin);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we call updateSkin and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then updateSkin should throw an error', async () => {
      const skinId = '1';
      const updatedSkin = {
        name: 'Updated Skin',
      } as unknown as FormData;
      const repo = new ApiRepo(token);
      await expect(repo.updateSkin(skinId, updatedSkin)).rejects.toThrow();
    });
  });

  describe('When we call deleteSkin and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then deleteSkin should throw an error', async () => {
      const skinId = '1';
      const repo = new ApiRepo(token);
      await expect(repo.deleteSkin(skinId)).rejects.toThrow();
    });
  });
});
