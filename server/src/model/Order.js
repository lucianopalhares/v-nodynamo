const dynamoose = require('dynamoose');
const uuid = require('uuid');
const axios = require('axios');

const config = require('../config/env');
let obj = config.dataConfig.DynamoDB;

const sdk = dynamoose.aws.sdk; // require("aws-sdk");
sdk.config.update({
    'accessKeyId': obj.accessKeyId,
    'secretAccessKey': obj.secretAccessKey,
    'region': obj.region,
    'endpoint': obj.endpoint
});

dynamoose.aws.ddb.local();

var ordersSchema = new dynamoose.Schema({
    "id": {
        "type": String,
        "hashKey": true,
        "default": uuid.v1()
    },
    "cliendId": {
        "type": String,
        "rangeKey": true,
    }
});

module.exports = dynamoose.model('Order', ordersSchema);