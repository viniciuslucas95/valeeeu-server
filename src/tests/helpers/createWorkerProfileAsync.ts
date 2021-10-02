import axios, { AxiosRequestConfig } from 'axios';
import { name, lorem } from 'faker';
import { EnvironmentConfig } from '../../configs';

const { findName, jobTitle, firstName } = name;
const { text } = lorem;

export async function createWorkerProfileAsync(
  axiosConfig: AxiosRequestConfig
) {
  const workerProfile = {
    name: findName(),
    job: jobTitle(),
    description: text(),
    tags: [firstName(), firstName(), firstName()],
  };
  const url = `http://localhost:${EnvironmentConfig.serverPort}/workers`;
  await axios.post(url, workerProfile, axiosConfig);
}
