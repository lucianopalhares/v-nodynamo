const dynamoose = require('dynamoose');
const uuid = require('uuid');
const axios = require('axios');

const Client = require('../../src/model/Client');

const config = require('dotenv').config();

const sdk = dynamoose.aws.sdk; // require("aws-sdk");
sdk.config.update({
    'accessKeyId': config.AWS_KEYID,
    'secretAccessKey': config.AWS_ACCESSKEYID,
    'region': config.AWS_REGION,
    'endpoint': config.AWS_HOST
});

dynamoose.aws.ddb.local();

var tenantSchema = new dynamoose.Schema({
    "slug": {
        "type": String,
        "hashKey": true
    },
    "name": {
        "type": String
    },
    "excluido": {
        "type": Boolean
    },
    "parent": dynamoose.THIS
});

module.exports = dynamoose.model('Tenant', tenantSchema);