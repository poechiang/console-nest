import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: 'jeffchiang',
            resave: false,
            saveUninitialized: false,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    const config = new DocumentBuilder()
        .setTitle('Console Nest API')
        .setDescription('Console Nest API test & document')
        .setVersion('0.0.1')
        .addSecurity('basic', {
            type: 'http',
            scheme: 'basic',
        })
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            controllerKey + '/' + methodKey,
    });

    SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: /.+\.jeffrey.me/,
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'HEAD', 'OPTIONS'],
        credentials: true,
    });
    await app.listen(9999);
}
bootstrap();
