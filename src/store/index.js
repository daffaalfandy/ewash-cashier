import Vue from "vue";
import Vuex from "vuex";
import items from "./modules/items";
import transaction from "./modules/transaction";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    items,
    transaction,
  },
});
