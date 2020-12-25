/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_LOCATION } from "../../../config/config";

const url = `${API_LOCATION}/transaction`;

const state = {
  cart: [],
};

const getters = {
  cart: (state) => state.cart,
};

const actions = {
  async addTransaction({ commit }, payload) {
    await axios.post(url, payload);
  },
};

const mutations = {
  setCart: (state, payload) => state.cart.unshift(payload.item),
  emptyCart: (state) => (state.cart = []),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
