import App from './app';

import { userRouter } from './routes/users';

const app = new App(3050);

app.use('/users', userRouter);

app.listen();
