const dynamoose = require('dynamoose');
const uuid = require('uuid');
const axios = require('axios');

const Tenant = require('../../src/model/Tenant');

const config = require('dotenv').config();

const sdk = dynamoose.aws.sdk; // require("aws-sdk");
sdk.config.update({
    'accessKeyId': config.AWS_KEYID,
    'secretAccessKey': config.AWS_ACCESSKEYID,
    'region': config.AWS_REGION,
    'endpoint': config.AWS_HOST
});

dynamoose.aws.ddb.local();

var clientSchema = new dynamoose.Schema({
    "id": {
        "type": String,
        "hashKey": true,
        "default": uuid.v1(),
        "required": true
    },
    "tenant":{
        "type": String,
        "required": true
    },
    "parent": Tenant,
    "razao_social": {
        "type": String
    },
    "nome_fantasia": {
        "type": String
    },
    "tipo": {
        "type": String
    },
    "cpf": {
        "type": String
    },
    "cnpj": {
        "type": String
    },
    "inscricao_estadual": {
        "type": String
    },
    "suframa": {
        "type": String
    },
    "nome_excecao_fiscal": {
        "type": String    
    },
    "observacao": {
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