/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_LOCATION } from "../../../config/config";

const url = `${API_LOCATION}/transaction`;

const state = {
  cart: [],
  dailyTransaction: [],
};

const getters = {
  cart: (state) => state.cart,
  dailyTransaction: (state) => state.dailyTransaction,
};

const actions = {
  async addTransaction({ commit }, payload) {
    await axios.post(url, payload);
  },
  async fetchDailyTransaction({ commit }, payload) {
    const response = await axios.get(
      `${url}?d=${payload.date}&m=${payload.month}&y=${payload.year}`
    );

    commit("setDailyTransaction", response.data);
  },
};

const mutations = {
  setCart: (state, payload) => state.cart.unshift(payload.item),
  emptyCart: (state) => (state.cart = []),
  setDailyTransaction: (state, payload) =>
    (state.dailyTransaction = payload.transaction),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
