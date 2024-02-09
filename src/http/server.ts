import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma';

const app = fastify();

app.post('/poll', async (request, reply) => {
  console.log('[POST] /poll');

  const createPollBody = z.object({
    title: z.string()
  });

  const { title } = createPollBody.parse(request.body);

  const poll = await prisma.poll.create({
    data: {
      title
    }
  });

  return reply.status(201).send({ pollId: poll.id });
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});
