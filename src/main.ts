import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import csurf from 'csurf';
import { rateLimit } from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '@modules/common/interceptors/undefinedToNull.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestFactory를 이용해 Nest 앱 생성
  const config = new DocumentBuilder()
    .setTitle('Mountain NestJS API')
    .setDescription('Mountain NestJS API 문서입니다.')
    .setVersion('1.0')
    .addTag('mountain')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger 설정
  app.useGlobalInterceptors(new UndefinedToNullInterceptor()); // 모든 요청에 대해 UndefinedToNullInterceptor를 적용
  app.use(helmet()); // 보안을 위한 헤더 설정
  app.enableCors(); // CORS 허용
  app.use(csurf({ cookie: true })); // CSRF 토큰 사용
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1분
      max: 1000, // 1분에 1000번
    }),
  ); // Rate Limitwi
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  } // HMR
}
bootstrap();
