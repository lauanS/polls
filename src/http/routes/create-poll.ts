import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { FastifyInstance } from 'fastify';

export async function createPoll(app: FastifyInstance) {
  app.post('/poll', async (request, reply) => {
    console.log('[POST] /poll');

    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string())
    });

    const { title, options } = createPollBody.parse(request.body);

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return { title: option }
            })
          }
        }
      }
    });

    return reply.status(201).send({ pollId: poll.id });
  });
}
