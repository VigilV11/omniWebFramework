import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  fetch(id: number): AxiosPromise {
    return axios.get(`/users/${id}`);
  }

  save(userData: T): AxiosPromise {
    const { id } = userData;

    if (id) {
      return axios.put(`/users/${id}`, userData);
    }

    return axios.post('/users', userData);
  }
}
