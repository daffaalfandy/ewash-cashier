<template>
  <fragment>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Nomor Unit:</label>
      <input
        type="text"
        class="form-control col-sm-8"
        v-model="item.name"
        required
      />
    </div>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Jenis Unit:</label>
      <select :id="count" class="form-control col-sm-8" required>
        <template v-for="category in categories">
          <option
            :data-id="category._id"
            :key="category._id"
            :value="category.category"
            >{{ category.category }}</option
          >
        </template>
      </select>
    </div>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Kuantitas Unit:</label>
      <input
        type="number"
        class="form-control col-sm-8"
        v-model="item.qty"
        required
      />
    </div>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Petugas:</label>
      <input
        type="text"
        class="form-control col-sm-8"
        v-model="item.information"
      />
    </div>
  </fragment>
</template>

<script>
/*global EventBus, $  */
import { mapMutations } from "vuex";

export default {
  props: {
    count: Number,
    categories: Array,
  },
  data() {
    return {
      item: {
        name: "",
        category: Object,
        qty: 0,
        information: "",
        price: 0,
      },
    };
  },
  methods: {
    ...mapMutations(["setCart"]),
  },
  mounted() {
    EventBus.$on("submit-clicked", () => {
      let idCategory = $(`#${this.count}`)
        .find(":selected")
        .data("id");
      const index = this.categories.findIndex(
        (category) => category._id == idCategory
      );
      this.item.price = this.item.qty * this.categories[index].price;
      this.item.category = this.categories[index];
      this.setCart({ item: this.item });
    });
  },
  beforeDestroy() {
    EventBus.$off("submit-clicked");
  },
};
</script>
