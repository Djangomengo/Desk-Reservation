import {ConfigService} from "@nestjs/config";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as process from "process";

export const  getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions =>

({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,

    // ERINNERUNG:
    // Derzeit befinden sich alle Entitäten in 'shared/modules'.
    // Der Pfad `'/shared/modules/**/*.entity{.ts,.js}'` sorgt dafür, dass TypeORM gezielt in diesem Verzeichnis sucht.
    // Wenn du in der Zukunft Entitäten in anderen Ordnern hinzufügst, musst du diesen Pfad hier aktualisieren.
    entities: [__dirname + '/../../shared/modules/**/*.entity{.ts,.js}']})

