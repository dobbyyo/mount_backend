import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import csurf from 'csurf';
import { rateLimit } from 'express-rate-limit';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestFactory를 이용해 Nest 앱 생성
  app.use(helmet()); // 보안을 위한 헤더 설정
  app.enableCors(); // CORS 허용
  app.use(csurf({ cookie: true })); // CSRF 토큰 사용
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1분
      max: 1000, // 1분에 1000번
    }),
  ); // Rate Limit
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  } // HMR
}
bootstrap();
