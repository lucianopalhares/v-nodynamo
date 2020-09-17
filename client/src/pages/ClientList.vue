<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Lista de Clientes</h4>
              <p class="card-category">lista de clientes do {{$route.params.tenant}}</p>
            </template>

            <table class="table">
              <thead>
                <slot name="columns">
                  <tr>
                    <th v-for="column in columnsNames" :key="column">{{column}}</th>
                  </tr>
                </slot>
              </thead>
              <tbody>
              <tr v-for="(item, index) in data">
               
                <td>{{item.razao_social}}</td>
                <td>{{item.nome_fantasia}}</td>
                <td>{{item.cpf}}</td>
                <td>{{item.cnpj}}</td>
                <td>{{item.excluido?'Excluido':'Ativo'}}</td>
                
                <td>
                  <button type="button" class="badge badge-info" @click.prevent="showItem(item)">Ver</button>
                  <button v-if="!item.excluido" type="button" class="badge badge-primary" @click.prevent="editItem(item)">Editar</button>
                  <button v-if="!item.excluido" type="button" class="badge badge-danger" @click.prevent="deleteItem(item)">Excluir</button>
                  <button v-else type="button" class="badge badge-success" @click.prevent="ativarItem(item)">Ativar</button>
                </td>
              </tr>
              </tbody>
            </table>

          </card>

        </div>

  
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import axios from "axios"

  const tableColumnsNames = ['Razão Social', 'Nome Fantasia', 'CPF', 'CNPJ', 'STATUS','Ações']

  export default {
    components: {
      Card
    },
    data () {
      return {
        url:"http://localhost:3000/",
        data: [],
        columnsNames: [...tableColumnsNames]
      }
    },
    created (){
      this.get();
    },
    methods: {
      get () {
        
        axios.get(this.url+this.$route.params.tenant+"/cliente/").then(response => {

          if(response.status){

            this.data = response.data.items;

          }else{
            
            this.notifyVue(`Ops, algo deu errado`,'danger');

          }
        });
      },
      ativarItem (item) {

        let id = item.id;

        this.$confirm(
          {
            message: `Tem certeza que quer Ativar?`,
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

                axios.put(this.url+this.$route.params.tenant+"/cliente/"+id,{excluido:false}).then(response => {
                
                  if(response.status){

                    this.get();
                    
                    this.notifyVue(`Ativado com Sucesso!`,'success');

                  }else{

                    this.notifyVue(`Ops, algo deu errado`,'danger');

                  }
                });

              }
            }
          }
        )
      },
      editItem (item) {
        this.$router.push('/admin/tenant/'+this.$route.params.tenant+'/editar-cliente/'+item.id );
      },
      showItem (item) {
        this.$router.push('/admin/tenant/'+this.$route.params.tenant+'/visualizar-cliente/'+item.id );
      },
      deleteItem (item) {

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

                axios.delete(this.url+this.$route.params.tenant+"/cliente/"+item.id).then(response => {
              
                  if(response.status){

                    this.get();
                    
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
      
    }
  }

</script>
<style>
</style>
