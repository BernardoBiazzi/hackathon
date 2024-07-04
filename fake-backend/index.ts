import { createServer } from 'the-fake-backend';

const server = createServer();

server.routes([
  /**
   * https://github.com/rhberro/the-fake-backend#getting-started
   */
  {
    path: '/example',
    methods: [
      {
        type: 'get',
        data: {
          example: true,
        },
        // data: (req) => 'your-response-data-here-based-in-request'
      },
    ],
  },
  /**
   * This endpoint is mocked in /data/health.json
   * https://github.com/rhberro/the-fake-backend#files
   */
  {
    path: '/health',
    methods: [
      {
        type: 'get',
      },
    ],
  },
]);

server.listen(8080);
