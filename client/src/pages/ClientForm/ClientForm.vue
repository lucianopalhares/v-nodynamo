<template>
  <card>
    <h4 slot="header" class="card-title">{{this.formLabel}} Cliente</h4>
    <form>
      <div class="row">
        <div class="col-md-3">
          <base-input type="text"
                    label="Tenant"
                    :disabled="true"
                    placeholder="Light dashboard"
                    v-model="client.tenant">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="Razão Social"
                    :disabled="disableFields"
                    placeholder="Razão Social"
                    v-model="client.razao_social">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="text"
                    label="Nome Fantasia"
                    :disabled="disableFields"
                    placeholder="Nome Fantasia"
                    v-model="client.nome_fantasia">
          </base-input>
        </div>
      </div>

      <div class="row">

        <div class="col-md-4">
          <base-input type="text"
                    label="CPF"
                    :disabled="disableFields"
                    placeholder="CPF"
                    v-model="client.cpf">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="CNPJ"
                    :disabled="disableFields"
                    placeholder="CNPJ"
                    v-model="client.cnpj">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="Inscrição Estadual"
                    :disabled="disableFields"
                    placeholder="Inscrição Estadual"
                    v-model="client.inscricao_estadual">
          </base-input>
        </div>
      </div>



      <div class="row">
        <div class="col-md-2">
          <base-input type="text"
                    label="Tipo"
                    :disabled="disableFields"
                    placeholder="Tipo"
                    v-model="client.tipo">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="Suframa"
                    :disabled="disableFields"
                    placeholder="Suframa"
                    v-model="client.suframa">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="number"
                    label="Nome Exceção Fiscal"
                    :disabled="disableFields"
                    placeholdeNome="Exceção Fiscal"
                    v-model="client.nome_excecao_fiscal">
          </base-input>
        </div>
        <div class="col-md-2">
          <base-input type="boolean"
                    label="Status"
                    :disabled="true"
                    placeholder="Status"
                    :value="client.excluido?'Excluido':'Ativo'">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Observação</label>
            <textarea rows="3" class="form-control border-input"
                      placeholder="Aqui insira a observação"
                      :disabled="disableFields"
                      v-model="client.observacao">
              </textarea>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="disableFields && !client.excluido">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="editNow(client)">
          Editar
        </button>
      </div>
      <div class="text-center" v-else-if="!client.excluido">
        <button v-if="this.formLabel=='Editar'" type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateItem">
          Atualizar
        </button>
        <button v-if="this.formLabel=='Cadastrar'" type="submit" class="btn btn-info btn-fill float-right" @click.prevent="createItem">
          Cadastrar
        </button>
        <button v-if="this.formLabel=='Editar'" type="button" class="btn btn-danger btn-fill float-left" @click.prevent="deleteItem">
          Excluir
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
  
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import axios from "axios"

  export default {
    components: {
      Card
    },

    data () {
      return {
        url:"http://localhost:3000/",
        client: {
          id:"",
          razao_social: "",
          nome_fantasia: "",
          tipo: "J",
          cpf: "",
          cnpj: "",
          inscricao_estadual: "ISENTO",
          suframa: "",
          nome_excecao_fiscal: "ISENTO",  
          observacao: "",
          emails: [],
          telefones: [],
          contatos: [],
          enderecos: [],
          custom: [],
          excluido: false,
          tenant: this.$route.params.tenant
        },
        emailModel: {
          email: ""
        },
        telefoneModel: {
          numero: ""
        },
        contatoModel: {
          nome: "",
          cargo: "",
          emails: []
        },
        enderecoModel: {
          cep: "",
          endereco: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          Principal: ""
        },
        customModel: {
          campo: "",
          valor: ""
        },
      }
    },
    created (){
      
    },
    computed (){
      
    },
    methods: {
      clearData () {
        this.client = {
          id:"",
          razao_social: "",
          nome_fantasia: "",
          tipo: "J",
          cpf: "",
          cnpj: "",
          inscricao_estadual: "ISENTO",
          suframa: "",
          nome_excecao_fiscal: "ISENTO",  
          observacao: "",
          emails: [],
          telefones: [],
          contatos: [],
          enderecos: [],
          custom: [],
          excluido: false,
          tenant: this.$route.params.tenant
        };
      },
      showItem () {
        
        axios.get(this.url+this.$route.params.tenant+"/cliente/"+this.$route.params.id).then(response => {

          if(response.status){

            this.client = response.data;

          }else{
            
            this.notifyVue(`Ops, algo deu errado`,'danger');

          }
        });
      },
      createItem () {

        let send = this.client;
        delete send.id;
        delete send.contatos;
        delete send.custom;
        delete send.emails;
        delete send.enderecos;
        delete send.telefones;

        axios.post(this.url+this.$route.params.tenant+"/cliente",send).then(response => {
          if(response.status){
            console.log(response.data);
            this.client = response.data;
            
            this.notifyVue(`Salvo com Sucesso!`,'primary');

          }else{

            this.notifyVue(`Ops, algo deu errado`,'danger');

          }
        });
      },
      updateItem () {

        let send = this.client;
        delete send.id;

        axios.put(this.url+this.$route.params.tenant+"/cliente/"+this.$route.params.id,send).then(response => {
         
          if(response.status){

            this.client = response.data;
            
            this.notifyVue(`Salvo com Sucesso!`,'primary');

          }else{

            this.notifyVue(`Ops, algo deu errado`,'danger');

          }
        });
      },
      editNow (item) {
        this.$router.push('/admin/tenant/'+this.$route.params.tenant+'/editar-cliente/'+item.id );
      },
      deleteItem () {

        this.$confirm(
          {
            message: `Tem certeza que quer deletar?`,
            button: {
              no: 'Não',
              yes: 'Sim'
            },
            /**
            * Callback Function
            * @param {Boolean} confirm 
            */
            callback: confirm => {
              if (confirm) {

                axios.delete(this.url+this.$route.params.tenant+"/cliente/"+this.$route.params.id).then(response => {
              
                  if(response.status){

                    this.client = response.data.data;

                    this.$router.push('/admin/tenant/'+this.$route.params.tenant+'/visualizar-cliente/'+this.$route.params.id );
                    
                    this.notifyVue(`Deletado com Sucesso!`,'primary');

                  }else{

                    this.notifyVue(`Ops, algo deu errado`,'danger');

                  }
                });

              }
            }
          }
        )

      },
      notifyVue (msg,type,icon = 'nc-icon nc-app',verticalAlign = 'top', horizontalAlign = 'center') {
        this.$notifications.notify(
          {
            message: msg,
            icon: icon,
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: type
          })
      }
    },
    computed:{
      formLabel: function(){
        if(this.$route.params.id){
          this.showItem();
          return this.$route.name == 'ClientShow' ? 'Visualizar' : 'Editar';          
        }else{
          return 'Cadastrar';
        }
      },
      disableFields: function(){
        return this.$route.params.id && this.$route.name == 'ClientShow' ? true : false;
      }
    }
  }

</script>
<style>

</style>
