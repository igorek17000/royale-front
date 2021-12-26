module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2c5603b524f7c8a83b8f9bae866f2b1d'),
  },
});
