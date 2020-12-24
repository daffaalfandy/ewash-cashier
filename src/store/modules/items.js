import axios from "axios";
import { API_LOCATION } from "../../../config/config";

const url = `${API_LOCATION}/items`;

const state = {
  items: [],
};

const getters = {
  items: (state) => state.items,
};

const actions = {
  async addItem({ commit }, payload) {
    const response = await axios.post(url, payload.item);

    commit("addItem", response.data);
  },
  async fetchItems({ commit }) {
    const response = await axios.get(url);

    commit("setItems", response.data);
  },
  async updateItem({ commit }, payload) {
    const response = await axios.put(
      `${url}/${payload.item._id}`,
      payload.item
    );

    commit("updateItem", response.data);
  },
  async deleteItem({ commit }, payload) {
    await axios.delete(`${url}/${payload._id}`);

    commit("deleteItem", payload);
  },
};

const mutations = {
  addItem: (state, payload) => state.items.unshift(payload.item),
  setItems: (state, payload) => (state.items = payload.items),
  updateItem: (state, payload) => {
    const index = state.items.findIndex((item) => item._id == payload.item._id);
    state.items.splice(index, 1, payload.item);
  },
  deleteItem: (state, payload) => {
    const index = state.items.findIndex((item) => item._id == payload._id);
    state.items.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
