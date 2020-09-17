var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
    accessKeyId: 'AKIARWAIL6E654EJGFEB',
    secretAccessKey: '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',
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing clients into DynamoDB. Please wait.");

var allClients = JSON.parse(fs.readFileSync('afv-cliente.json', 'utf8'));
allClients.forEach(function(client) {
    var params = {
        TableName: "afv-cliente",
        Item: {
            "razao_social":  client.razao_social,
            "nome_fantasia": client.nome_fantasia,
            "tipo":  client.tipo,
            "cpf":  client.cpf,
            "cnpj":  client.cnpj,
            "inscricao_estadual":  client.inscricao_estadual,
            "suframa":  client.suframa,
            "nome_excecao_fiscal":  client.nome_excecao_fiscal,
            "observacao":  client.observacao,
            "emails":  client.emails,
            "telefones":  client.telefones,
            "contatos":  client.contatos,
            "enderecos":  client.enderecos,
            "custom":  client.custom,
            "excluido":  client.excluido
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add client", client.razao_social, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", client.razao_social);
       }
    });
});

                