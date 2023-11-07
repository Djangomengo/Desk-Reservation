import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export function swaggerSetup(app): void {
    const options = new DocumentBuilder()
        .setTitle('Desk Reservation')
        .setDescription('book your working space')
        .setVersion('10')
        .addTag('Desk')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document)
}