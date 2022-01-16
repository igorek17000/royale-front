module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'royale'),
        // database: env('DATABASE_NAME', 'royale-server'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'ChiefSosa@123S'),
        // password: env('DATABASE_PASSWORD', 'Asroma1927$'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: { strict: 'true' },
    },
  },
})
