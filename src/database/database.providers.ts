import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_MOUNTAIN',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT as number,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        charset: 'utf8mb4',
        logging: true, // 쿼리를 콘솔에 출력
        synchronize: true, // 실제 DB에 적용되는 것은 아니고, 엔티티의 변경사항을 DB에 적용하는 것
      });
      return dataSource.initialize();
    },
  },
];
