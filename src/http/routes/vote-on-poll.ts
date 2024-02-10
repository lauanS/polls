import { z } from 'zod';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { FastifyInstance } from 'fastify';

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

    return reply.send({ success: true })
  });
}