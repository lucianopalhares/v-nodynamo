const config = require('dotenv').config();

module.exports = {
    env: 'development',
    nomeApi: 'test',
    dataConfig: {
      DynamoDB: {
        endpoint: config.AWS_HOST,
        accessKeyId: config.AWS_KEYID,
        secretAccessKey: config.AWS_ACCESSKEYID,
        region: config.AWS_REGION
      }
    }
  };