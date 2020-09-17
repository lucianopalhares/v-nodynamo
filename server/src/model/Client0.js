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

var clientSchema = new dynamoose.Schema({
    "id": {
        "type": String,
        "hashKey": true,
        "default": uuid.v1()
    },
    "razao_social": {
        "type": String,
        "rangeKey": true,
    },
    "emails": {
        "type": Array,
        "schema": [{
            "type": Object,
            "schema": {
                "email": {
                    "type": String
                }
            }
        }]
    },
    "telefones": {
        "type": Array,
        "schema": [{
            "type": Object,
            "schema": {
                "numero": {
                    "type": String
                }
            }
        }]
    },
    "contatos": {
        "type": Array,
        "schema": [{
            "type": Object,
            "schema": {
                "nome": {
                    "type": String
                },
                "cargo": {
                    "type": String
                },
                "emails": {
                    "type": Array,
                    "schema": [{
                        "type": Object,
                        "schema": {
                            "email": {
                                "type": String
                            }
                        }
                    }]
                },
                "telefones": {
                    "type": Array,
                    "schema": [{
                        "type": Object,
                        "schema": {
                            "numero": {
                                "type": String
                            }
                        }
                    }]
                }
            }
        }]
    },
    "enderecos": {
        "type": Array,
        "schema": [{
            "type": Object,
            "schema": {
                "cep": {
                    "type": String
                },
                "endereco": {
                    "type": String
                },
                "numero": {
                    "type": String
                },
                "complemento": {
                    "type": String
                },
                "bairro": {
                    "type": String
                },
                "cidade": {
                    "type": String
                },
                "estado": {
                    "type": String
                },
                "Principal": {
                    "type": Number
                }
            }
        }]
    },
    "custom": {
        "type": Array,
        "schema": [{
            "type": Object,
            "schema": {
                "campo": {
                    "type": String
                },
                "valor": {
                    "type": String
                }
            }
        }]
    },
    "excluido": {
        "type": Boolean
    }
});

module.exports = dynamoose.model('Client', clientSchema);