import axios, { type AxiosResponse } from 'axios';

type GetPollResponse = {
  votes: Record<string, string>
  poll: Poll
}

type PostPollVoteParams = {
  pollId: string,
  pollOptionId: string
}

type PollOption = {
  id: string,
  title: string,
  score: number
}

export type Poll = {
  id: string,
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

const votePollRequest = async ({ pollId, pollOptionId }: PostPollVoteParams): Promise<void> => {
  await client.post(`/poll/${pollId}/vote`, { pollOptionId })
};

export default {
  getPollRequest,
  votePollRequest
}
