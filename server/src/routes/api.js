const routes = require('express').Router();
var cors = require('cors');
const Client = require('../../src/model/Client');

routes.use(cors());

const ClientMiddleware = require('../../src/middleware/ClientMiddleware');

const TenantsController = require('../../src/controller/TenantsController');
const ClientsController = require('../../src/controller/ClientsController');
const ClientsPhonesController = require('../../src/controller/ClientsPhonesController');

// API TENANTS - INICIO
routes.get('/tenant', TenantsController.index);
routes.get('/tenant/:id', TenantsController.show);
routes.post('/tenant/', TenantsController.store);
routes.put('/tenant/:id', TenantsController.update);
routes.delete('/tenant/:id', TenantsController.delete);
// API TENANTS - FIM

// API CLIENTS - INICIO
routes.get('/:tenant/cliente', ClientsController.index);
routes.get('/:tenant/cliente/:id', ClientsController.show);
routes.post('/:tenant/cliente/', ClientsController.store);
routes.put('/:tenant/cliente/:id', ClientsController.update);
routes.delete('/:tenant/cliente/:id', ClientsController.delete);
// API CLIENTS - FIM




//teste pegando dados direto da aws:

const config = require('../config/env');
let obj = config.dataConfig.DynamoDB;
const AWSTest = require('aws-sdk');
AWSTest.config.update({
    'accessKeyId': obj.accessKeyId,
    'secretAccessKey': obj.secretAccessKey,
    'region': obj.region,
    'endpoint': obj.endpoint
});

routes.get('/teste', async(req, res)=>{
    var params = {
        TableName: 'AFV-TESTE'
      };
      var docClient = new AWSTest.DynamoDB.DocumentClient();

      docClient.scan(params, onScan);

        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {

                // print all the item
                console.log("Scan succeeded.");
                data.Items.forEach(function(item) {
                    console.log(item);
                });

                // continue scanning if we have more item, because
                // scan can retrieve a maximum of 1MB of data
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
                
            }
        }
});

module.exports = routes;