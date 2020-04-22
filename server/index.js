const express = require('express');
const next = require('next');
const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: 'app', dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('*', (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) throw err;
      /* eslint-disable-next-line */
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
