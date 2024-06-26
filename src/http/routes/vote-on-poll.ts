import { z } from 'zod';
import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { voting } from '@/utils/voting-pub-sub';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/poll/:pollId/vote', async (request, reply) => {
    console.log('[POST] /poll/:pollId/vote');

    const voteOnPollParams = z.object({
      pollId: z.string().uuid()
    })
    
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid()
    });

    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId
          }
        }
      });

      if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId === pollOptionId) {
        return reply.status(400).send({ message: 'You already vote on this poll' });
      }

      if (userPreviousVoteOnPoll) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id
          }
        })

        const votes = Number(await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId));

        voting.publish(pollId, {
          pollOptionId,
          votes
        })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId
      }
    });

    const votes = Number(await redis.zincrby(pollId, 1, pollOptionId));

    voting.publish(pollId, {
      pollOptionId,
      votes
    })

    return reply.send()
  });
}
