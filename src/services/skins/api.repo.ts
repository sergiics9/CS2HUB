import { serverUrl } from '../../config';
import { Skin } from '../../entities/skin';

export class ApiRepo {
  apiUrl = serverUrl + '/skins';
  constructor(public token: string) {}

  async querySkins(query: string): Promise<Skin[]> {
    const response = await fetch(`${this.apiUrl}/filter?category=${query}`);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async getSkins(): Promise<Skin[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async createSkin(newSkin: FormData): Promise<Skin> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: newSkin,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateSkin(id: string, updatedSkin: FormData): Promise<Skin> {
    const finalUrl = `${this.apiUrl}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: updatedSkin,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteSkin(id: Skin['id']): Promise<void> {
    const finalUrl = `${this.apiUrl}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
  }
}
