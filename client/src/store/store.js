// store.js

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    namespaced: true,

    state: {
        create: false,
        show: false,
        edit: false,
        selectProducts: false,
        vendaPendente: false
    },

    getters: {
        isNovaVenda(state) {
            return state.create;
            console.log('store/modules/vendas.js  getters/isNovaVenda *');
        },
        isEditarVenda(state) {
            return state.edit;
        },

        isSelecaoProdutos(state) {
            return state.selectProducts;
        },


    },

    mutations: {
        NOVA_VENDA(state) {
            state.create = true;
            state.show = false;
            state.edit = false;
            state.selectProducts = false;
        },

        SELECAO_PRODUTOS(state) {
            state.selectProducts = true;
        },

        FINALIZAR_VENDA(state) {
            state.create = false;
            state.show = false;
            state.edit = false;
            state.selectProducts = false;
            state.vendaPendente = false;
        },

        EDITAR_VENDA(state) {
            state.create = false;
            state.edit = true;
            state.show = false;
            state.selectProducts = false;
        },

        VISUALIZAR_VENDA(state) {
            state.create = false;
            state.edit = false;
            state.selectProducts = false;
            state.show = true;
        },
        RESET(state) {
            state.create = false;
            state.edit = false;
            state.selectProducts = false;
            state.show = false;
        },
        EXISTS_VENDA_PENDENTE(state) {
            state.vendaPendente = true;
        },
        NOT_EXISTS_VENDA_PENDENTE(state) {
            state.vendaPendente = false;
        },
    },

    actions: {
        //nova:({commit}) => commit('NOVA_VENDA'),
        nova(context) {
            console.log('store/modules/vendas.js  actions/nova *');
            context.commit('NOVA_VENDA');
        },

        selecaoProdutos(context) {
            context.commit('SELECAO_PRODUTOS');
        },

        finalizar(context) {
            context.commit('FINALIZAR_VENDA');
        },

        editar(context) {
            context.commit('EDITAR_VENDA');
        },

        visualizar(context) {
            context.commit('VISUALIZAR_VENDA');
        },

        reset(context) {
            context.commit('RESET');
        },

        pending(context) {
            context.commit('EXISTS_VENDA_PENDENTE');
        },
        notPending(context) {
            context.commit('NOT_EXISTS_VENDA_PENDENTE');
        }
    }
});

export default store;
