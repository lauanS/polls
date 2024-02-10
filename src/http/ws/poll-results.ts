import { FastifyInstance } from 'fastify';

export async function pollResults(app: FastifyInstance) {
  app.get('/poll/:pollId/results', { websocket: true }, (connection, request) => {
    console.log('[WS] Connect');
    connection.socket.on('message', (message: string) => {
      connection.socket.send('You sent ' + message)
    });
  });
}
