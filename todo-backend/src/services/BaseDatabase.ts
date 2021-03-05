import knex, { Knex } from 'knex';

export abstract class BaseDatabase {
  private static connection: Knex | null = null;

  public getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        }
      });
    }

    return BaseDatabase.connection;
  }

  public async destroyConnection(): Promise<void> {
    await BaseDatabase.connection.destroy();
    BaseDatabase.connection = null;
  }
}
