import axios, { AxiosPromise } from 'axios';

export class Collection {
  fetchAllIds(): AxiosPromise {
    return axios.get(`/users`);
  }
}
