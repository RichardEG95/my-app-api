import { Sequelize } from 'sequelize';
import { Comment } from '../comments/Comment';

export default class MyAppDB {
  private readonly sequelize: Sequelize;
  private readonly dbModels = [Comment];

  private constructor(dbHost: string, dbName: string, dbUser: string, dbPassword: string, dbPort: number) {
    this.sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: 'mysql',
      port: dbPort,
      dialectOptions: {
        connectTimeout: 60000
      }
    });
  }

  private async testConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established');
    } catch (error) {
      console.error('Unable to connect to Database', error);
    }
  }

  private setupDbModels(): void {
    this.dbModels.forEach((model) => {
      model.initModel(this.sequelize)
    });
  }

  public static async initialize(): Promise<void> {
    const dbHost = '127.0.0.1';
    const dbName = 'my-app';
    const dbUser = 'root';
    const dbPort = 3306;
    const dbPassword = 'R8TAPz9yKm?9SN!Y';

    const connection = new MyAppDB(dbHost, dbName, dbUser, dbPassword, dbPort);
    await connection.testConnection();
    connection.setupDbModels();
  }
}
