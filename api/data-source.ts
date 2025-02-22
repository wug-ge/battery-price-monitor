import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd() + '/..', '.env') })


export const ApiDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    __dirname + "/models/*.ts",
  ],
  synchronize: false,
  logging: false,
  migrations: ["migrations/*.ts"],
  charset: "utf8mb4",
});
