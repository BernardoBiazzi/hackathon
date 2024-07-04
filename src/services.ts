import axios from 'axios';
import { ENVS } from 'config/envs';

const client = axios.create({ baseURL: ENVS.BASE_URL });

type ExampleResponse = {
  example: boolean;
};

export const getExample = async () => {
  const { data } = await client.get<ExampleResponse>('/example');

  return data;
};
