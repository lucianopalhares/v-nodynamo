var AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: 'AKIARWAIL6E654EJGFEB',
    secretAccessKey: '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',
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "afv-cliente",
    KeySchema: [       
        { AttributeName: "razao_social", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "razao_social", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
