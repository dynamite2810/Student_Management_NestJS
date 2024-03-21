import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Action, useExpressServer } from 'routing-controllers';
import { verifyToken } from './utils/token';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Enable routing-controllers to apply middleware to controllers and routes.
  useExpressServer(app);
  await app.listen(3000);
  // useExpressServer(app, {
  //     plainToClassTransformOptions: {
  //       excludeExtraneousValues: true,
  //     },
  //     validation: true,
  //     authorizationChecker: async (action: Action, roles: string[]) => {
  //       try {
  //         const token = action.request.headers['authorization'].split(' ')[1];
  //         await verifyToken(token)
  //         return true
  //       } catch (err: any) {
  //         return false
  //       }
  //     },
  //     defaultErrorHandler: false,
  //     // routePrefix: '/api',
  //     // middlewares: [path.join(__dirname, '/middlewares/*.ts')],
  //     // controllers: [path.join(__dirname, '/controllers/*.ts')],
  //   })
}
bootstrap();
