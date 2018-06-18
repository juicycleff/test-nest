import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { grpcClientOptions } from './grpc-client.options';
import { Transport } from '@nestjs/microservices';
import { bodyParserGraphQL } from 'body-parser-graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParserGraphQL());

  /*
   * @description enable static file path
  app.useStaticAssets({
    root: join(__dirname, '../public'),
    prefix: './public/',
  });
  */
  /**
   * @description enable custom views at address /views
   */
  app.setBaseViewsDir(__dirname + '/views');

  /**
   * @description enable handlebar view
   */
  app.setViewEngine('hbs');

  /**
   * @description swagger options setup
   */
  const options = new DocumentBuilder()
  .setTitle('UNIZONN REST API')
  .setDescription('The unizonn API description')
  .setVersion('0.0.5')
  .addTag('unizionn')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);

  /**
   * @description swagger api setup
   */
  SwaggerModule.setup('api', app, document);

  /**
   * Hybrid application (HTTP + GRPC)
   * Switch to basic microservice with NestFactory.createMicroservice():
   *
   * const app = await NestFactory.createMicroservice(ApplicationModule, {
   *  transport: Transport.GRPC,
   *  options: {
   *    package: 'hero',
   *    protoPath: join(__dirname, './hero/hero.proto'),
   *  }
   * });
   * await app.listenAsync();
   *
   */
  // app.connectMicroservice(grpcClientOptions);
  /*app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });*/

  // await app.startAllMicroservicesAsync();
  await app.listen(3030);
}
bootstrap();
