'use strict';

const ClientModel = require('../model/client');
const { ErrorHelper } = require('../helpers');

const repository = {

  getAllByClient(razao_social) {
    return ClientModel.query({ razao_social })
      .exec()
      .then(clientsResult => {
        if (clientsResult) {
          const clientsToResponse = clientsResult.map(clientResult => {
            const { razao_social } = clientResult;
            return { razao_social };
          });
          return Promise.resolve(clientsToResponse);
        }
        return Promise.resolve([]);
      });
  }
};

module.exports = repository;