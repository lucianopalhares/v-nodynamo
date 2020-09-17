const Client = require('../../src/model/Client');

module.exports = {
    // * show all phones of the client - by client id
    async index (req, res) {

        try {

            const itemGet = await Client.get(req.params.id);
            
            if(!itemGet){

                res.status(500).send({
                    error: 'Cliente Não Encontrado'
                })
            }

            const items = itemGet.telefones;
            
            return res.json({items});

        } catch (err) {

            res.status(500).send({
                error: 'an error has occured trying to fetch the client'
            })
        }        
    },
    // * show a phone - by client id and array index of the telefones
    async show (req, res) {
        try {

            const itemGet = await Client.get(req.params.id);
        
            if(!itemGet){

                res.status(500).send({
                    error: 'Cliente Não Encontrado'
                })
            }

            itemGet.telefones[req.params.index-array] = req.body;
        
            const item = await Client.update(itemGet);
            return res.json(item);

        } catch (err) {

        res.status(500).send({
            error: 'an error has occured trying to fetch the client'
        })

        }
    },
    // * add phones to client's phone array - by client id
    // ex: body request - json to add
    /*
        [
            {
                "numero": "(99) 9298-8999"
            },
            ..
        ]
    */
    async store (req, res) {
        try {

            const itemGet = await Client.get(req.params.id);

            if(!itemGet){

                res.status(500).send({
                    error: 'Cliente Não Encontrado'
                })
            }

            let requestBody = req.body;
            
            for(var i = 0;i< requestBody.length;i++) {
                
                itemGet.telefones.push(requestBody[i]);
            }
            const item = await Client.update(itemGet);
            return res.json(item);

        } catch (err) {

        res.status(500).send({
            error: 'an error has occured trying to store the client'
        })

        }
    },
    // * edit a phone to client's phone array - by client id
    // ex: body request - json to add
    /*
        {
            "numero": "(99) 9298-8999"
        }
    */
    async update (req, res) {
        try {

            const itemGet = await Client.get(req.params.id);
        
            if(!itemGet){

                res.status(500).send({
                    error: 'Cliente Não Encontrado'
                })
            }

            itemGet.telefones[req.params.index-array] = req.body;
        
            const item = await Client.update(itemGet);
            return res.json(item);

        } catch (err) {

        res.status(500).send({
            error: 'an error has occured trying to update the client'
        })

        }
    },
    // * delete a specific phone of a client - by client id
    // ex: body request - json to delete
    /*
        {
            "numero": "(99) 9298-8999"
        }
    */
    async delete (req, res) {
        try {

            const itemGet = await Client.get(req.params.id);

            if(!itemGet){
                return res.json({status:false,msg:'Cliente Não Encontrado'});
            }

            let telefones = itemGet.telefones;
            for(var i = telefones.length - 1; i >= 0; i--) {
                if(telefones[i] === req.body) {
                    telefones.splice(i, 1);
                }
            }
        
            const item = await Client.update(itemGet);
            return res.json(item);

        } catch (err) {

        res.status(500).send({
            error: 'an error has occured trying to delete the client'
        })

        }
    }
}