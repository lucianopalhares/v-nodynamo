<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <client-form>
          </client-form>
        </div>
        <!--<div class="col-md-4">
          <user-card>
          </user-card>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import ClientForm from './ClientForm/ClientForm.vue'

  export default {
    components: {
      ClientForm
    }
  }

</script>
<style>

</style>
