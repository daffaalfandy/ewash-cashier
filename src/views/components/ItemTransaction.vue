<template>
  <fragment>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Nama Barang:</label>
      <input
        type="text"
        class="form-control col-sm-8"
        :name="items.itemName"
        required
      />
    </div>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Jenis Barang:</label>
      <select :name="items.itemCategory" class="form-control col-sm-8" required>
        <option value="car">Mobil</option>
        <option value="motorcycle">Motor</option>
        <option value="carpet">Karpet</option>
      </select>
    </div>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Kuantitas Barang:</label>
      <input
        type="number"
        class="form-control col-sm-8"
        :name="items.itemQty"
        required
      />
    </div>
    <div class="form-group row justify-content-center">
      <label class="col-sm-4 col-form-label">Keterangan:</label>
      <input
        type="text"
        class="form-control col-sm-8"
        :name="items.itemInformation"
      />
    </div>
  </fragment>
</template>

<script>
/*global EventBus */
export default {
  props: {
    count: Number,
  },
  data() {
    return {
      items: {
        itemName: `good-name-${this.count}`,
        itemCategory: `good-category-${this.count}`,
        itemQty: `good-qty-${this.count}`,
        itemInformation: `good-information-${this.count}`,
      },
    };
  },
  mounted() {
    EventBus.$on("submit-clicked", () => {
      console.log("submitted");
    });
  },
  beforeDestroy() {
    EventBus.$off("submit-clicked");
  },
};
</script>
