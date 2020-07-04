import axios, {AxiosPromise} from 'axios';

const ApiService = {
  init() {},
  query(resource: string): AxiosPromise {
    return axios.get(resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },
  get(resource: string): AxiosPromise {
    return axios.get(resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;
