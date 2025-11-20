import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
    .setTitle('RBAS API')
    .setDescription('The RBAS API description')
    .setVersion('1.0')
    .addTag('rbas')
    .addBearerAuth( // Add Bearer authentication
          { 
            type: 'http', 
            scheme: 'bearer', 
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'access-token' // Unique name for this security scheme
        )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
