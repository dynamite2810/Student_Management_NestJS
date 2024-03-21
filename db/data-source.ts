import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    // entities: [__dirname + '/entities/*.entity.js'],
    entities: ["dist/src/**/entities/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    // synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;