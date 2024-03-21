import * as dotenv from 'dotenv'
import * as path from 'path'

// import * as pkg from '../package.json'
import { getOsEnv, getOsEnvOptional, normalizePort, toBool, toNumber } from './utils/utils'

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`),
})
/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  appPath: __dirname,
  app: {
    name: getOsEnv('APP_NAME'),
    url: getOsEnv('APP_URL'),
    // version: (pkg as any).version,
    // description: (pkg as any).description,
    host: getOsEnv('APP_HOST'),
    schema: getOsEnv('APP_SCHEMA'),
    jwt_secret: getOsEnv('JWT_SECRET'),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    banner: toBool(getOsEnv('APP_BANNER')),
    logDir: getOsEnv('LOG_DIR'),
    fileSystemDriver: getOsEnv('FILESYSTEM_DRIVER'),
    disksDir: getOsEnv('DISKS_DIR') || '/public/uploads',
    // ipfsUrl: getOsEnv('IPFS_HOST'),
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnv('LOG_OUTPUT'),
    format: getOsEnv('LOG_FORMAT'),
  },
  db: {
    dialect: getOsEnv('DB_CONNECTION'),
    host: getOsEnvOptional('DB_HOST'),
    port: toNumber(getOsEnvOptional('DB_PORT')),
    username: getOsEnvOptional('DB_USERNAME'),
    password: getOsEnvOptional('DB_PASSWORD'),
    database: getOsEnv('DB_DATABASE'),
    synchronize: toBool(getOsEnvOptional('DB_SYNCHRONIZE')),
    logging: getOsEnv('DB_LOGGING') === 'true',
    storage: getOsEnvOptional('DB_STORAGE'),
  },
  swagger: {
    enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
    route: getOsEnv('SWAGGER_ROUTE'),
    username: getOsEnv('SWAGGER_USERNAME'),
    password: getOsEnv('SWAGGER_PASSWORD'),
  },
  monitor: {
    enabled: toBool(getOsEnv('MONITOR_ENABLED')),
    route: getOsEnv('MONITOR_ROUTE'),
    username: getOsEnv('MONITOR_USERNAME'),
    password: getOsEnv('MONITOR_PASSWORD'),
  },
  email: {
    provider: getOsEnv('MAIL_PROVIDER'),
    host: getOsEnv('MAIL_HOST'),
    port: toNumber(getOsEnvOptional('MAIL_PORT')),
    authUser: getOsEnvOptional('MAIL_AUTH_USER'),
    authPassword: getOsEnvOptional('MAIL_AUTH_PASSWORD'),
    fromName: getOsEnvOptional('MAIL_FROM_NAME'),
  },
  google: {
    clientId: getOsEnv('GOOGLE_API_CLIENT_ID'),
    clientSecret: getOsEnv('GOOGLE_API_CLIENT_SECRET'),
    redirect: getOsEnv('GOOGLE_API_REDIRECT'),
  },
  auth: {
    defaultProvider: getOsEnv('AUTH_DEFAULT_PROVIDER'),
    jwtSecret: getOsEnv('JWT_SECRET'),
  },
  cors: {
    origin: getOsEnv('ORIGIN'),
    credentials: toBool(getOsEnv('CREDENTIALS')),
  },
  s3: {
    bucketName: getOsEnv('AWS_S3_BUCKET'),
    defaultRegion: getOsEnv('AWS_S3_REGION'),
    accessKeyId: getOsEnv('AWS_S3_ACCESS_KEY_ID'),
    secretAccessKey: getOsEnv('AWS_S3_SECRET_ACCESS_KEY'),
  },
}
