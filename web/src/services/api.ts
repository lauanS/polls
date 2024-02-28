import axios, { type AxiosResponse } from 'axios';

export type Poll = {
  title: string,
  options: [{
    title: string,
    score: number
  }]
}

type GetPollResponse = {
  votes: Record<string, string>
  poll: Poll
}

const client = axios.create({
  baseURL: 'http://localhost:3333'
})

const getPollRequest = async (pollId: string): Promise<Poll> => {
  const response = await client.get(`/poll/${pollId}`) as AxiosResponse<GetPollResponse>;
  
  return response.data.poll;
};

export default {
  client,
  getPollRequest
}
