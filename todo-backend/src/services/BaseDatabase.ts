import knex, { Knex } from 'knex';

export abstract class BaseDatabase {
  private static connection: Knex | null = null;

  public getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: 'postgres',
        connection: {
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME
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
