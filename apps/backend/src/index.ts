import { PORT } from './env';
import Elysia from 'elysia';
import cors from "@elysiajs/cors"
import authRouter from './routers/auth';

const ALLOWED_ORIGINS = ["http://localhost:3000", "https://3000-dev.jojit.in"]

export const app = new Elysia()
  .use(cors({
    origin: ({ headers }) => {
      const origin = headers.get("origin");
      return origin ? ALLOWED_ORIGINS.includes(origin) : false;
    },
    credentials: true,
  }))
  .get('/', ({ cookie: { user } }) => "🤡 Hello from ElachiSync!")
  .use(authRouter)
  .listen(PORT, ({ hostname, port }) => console.log(`🦊 Elysia Server is running at http://${hostname}:${port}`));


export type App = typeof app

