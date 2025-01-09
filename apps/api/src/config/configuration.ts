// src/config/configuration.ts
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    app: {
      port: parseInt(process.env.PORT, 10) || 4000,
      baseUrl: process.env.BASE_URL || 'http://localhost:4000',
    },
    database: {
      uri: process.env.MONGO_DB_CONNECTION_STRING,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: 'majority',
      },
    },
    clerk: {
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  });
  
