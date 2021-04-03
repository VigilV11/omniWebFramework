import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  fetch(id: number): AxiosPromise {
    return axios.get(`/users/${id}`);
  }

  save(data: T, allValidIds: number[]): AxiosPromise {
    if (allValidIds.includes(data.id)) {
      return axios.put(`/users/${data.id}`, data);
    }

    return axios.post(`/users`, data);
  }
}
