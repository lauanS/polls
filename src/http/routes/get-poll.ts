import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { FastifyInstance } from 'fastify';

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
      }
    });

    return reply.status(200).send({ poll });
  });
}
