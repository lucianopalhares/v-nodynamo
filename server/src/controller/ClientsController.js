const Client = require('../../src/model/Client');
const { exec } = require('shelljs');

module.exports = {
  async index (req, res) {
    try {

      await Client.Condition().filter("tenant").eq(req.params.tenant).exec((error, results) => {
        if (error) {
          res.status(500).send({
            error: error
          })
        } else {
          const items = results;
          return res.json({items});
        }
      });      

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to fetch the client'
      })

    }
  },
  async show (req, res) {
    try {

      const item = await Client.get(req.params.id);      
    
      if(!item){
        return res.json({status:false,msg:'Item Não Encontrado'});
      }
      if(item.parent.slug!=req.params.tenant){
        return res.json({status:false,msg:'Tenant não encontrado para este Cliente'});
      }

      return res.json(item);

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to fetch the client'
      })

    }
  },
  async store (req, res) {
    try {

      req.body.parent = req.params.tenant;
      req.body.tenant = req.params.tenant;
      //item = req.body;
      const item = await Client.create(req.body);
      
      return res.json(item);

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to store the client'
      })

    }
  },
  async update (req, res) {
    try {

      const item = await Client.update({'id':req.params.id}, req.body);

      if(!item){
        return res.json({status:false,msg:'Item Não Encontrado'});
      }

      return res.json(item);

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to update the client'
      })

    }
  },
  async delete (req, res) {
    try {

      //await Client.delete(req.params.id);
      const item = await Client.update({'id':req.params.id},{'excluido':true});      

      if(!item){
        return res.json({status:false,msg:'Item Não Encontrado'});
      }
      
      return res.json({msg: 'Deleted',data:item});

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to delete the client'
      })

    }
  }
}