import axios, { type AxiosResponse } from 'axios';

type GetPollResponse = {
  votes: Record<string, string>
  poll: Poll
}

type PollOption = {
  id: string,
  title: string,
  score: number
}

export type Poll = {
  title: string,
  options: [PollOption]
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
