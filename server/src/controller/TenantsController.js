const Tenant = require('../../src/model/Tenant');

module.exports = {
  async index (req, res) {
    try {

      const items = await Tenant.scan().exec();
      return res.json({items});

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to fetch the Tenant'
      })

    }
  },
  async show (req, res) {
    try {

      const item = await Tenant.get(req.params.id);

      if(!item){
        return res.json({status:false,msg:'Item Não Encontrado'});
      }

      return res.json(item);

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to fetch the Tenant'
      })

    }
  },
  async store (req, res) {
    try {

      let name = req.body.name;
      req.body.slug =  name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

      const item = await Tenant.create(req.body);
      return res.json(item);

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to store the Tenant'
      })

    }
  },
  async update (req, res) {
    try {

      const item = await Tenant.update({'id':req.params.id},req.body);

      if(!item){
        return res.json({status:false,msg:'Item Não Encontrado'});
      }

      return res.json(item);

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to update the Tenant'
      })

    }
  },
  async delete (req, res) {
    try {

      //await Tenant.delete(req.params.id);
      const item = await Tenant.update({'id':req.params.id},{'excluido':true});      

      if(!item){
        return res.json({status:false,msg:'Item Não Encontrado'});
      }
      
      return res.json({msg: 'Deleted',data:item});

    } catch (err) {

      res.status(500).send({
        error: 'an error has occured trying to delete the Tenant'
      })

    }
  }
}