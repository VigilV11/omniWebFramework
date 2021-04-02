import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  constructor() {}

  fetch(id: number): AxiosPromise {
    return axios.get(`/users/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`/users/${id}`, data);
    } else {
      return axios.post(`/users`, data);
    }
  }
}
