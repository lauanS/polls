import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function getPoll(app: FastifyInstance) {
  app.get('/poll/:pollId', async (request, reply) => {
    console.log('[GET] /poll');

    const createPollParams = z.object({
      pollId: z.string().uuid()
    });

    const { pollId } = createPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found' });
    }

    const rawVotes = await redis.zrange(pollId, 0, -1, 'WITHSCORES');
    const votes = rawVotes.reduce((obj, line, index) => {
      if (index % 2 === 0) {
        const score = Number(rawVotes[index + 1]);
        
        obj[line] = score;
      }

      return obj;
    }, {} as Record<string, number>);

    poll.options = poll.options.map((option) => {
      return {
        ...option,
        score: votes[option.id] || 0
      };
    });
    
    return reply.status(200).send({ poll, votes });
  });
}
