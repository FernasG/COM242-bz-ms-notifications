export default (() => ({
  rabbitmq_url: process.env.RABBITMQ_URL,
  aws: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
  },
  email_source: process.env.AWS_EMAIL_SOURCE
}));