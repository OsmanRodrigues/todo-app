import knex, { Knex } from 'knex';
import { Env } from 'env-helper';
import { Service } from 'typedi';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = Env;

@Service()
export abstract class BaseDatabase {
  private static connection: Knex | null = null;

  public getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: 'postgres',
        connection: {
          host: DATABASE_HOST,
          port: Number(DATABASE_PORT),
          user: DATABASE_USER,
          password: DATABASE_PASSWORD,
          database: DATABASE_NAME
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
