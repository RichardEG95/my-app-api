import AppFactory from './AppFactory';
import MyAppDB from './database/MyAppDB';

async function init(): Promise<void> {
  await MyAppDB.initialize();

  const server = AppFactory.create();
  const port = 5000;

  server.listen(port, () => {
    console.log('listening on port:', port);
  });
}

init()
.then(() => console.log('Server running'))
.catch((err) => console.error('Error:', err))
