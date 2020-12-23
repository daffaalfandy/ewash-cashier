<template>
  <div class="container">
    <div class="card shadow text-center">
      <h3 class="card-header text-center">Transaksi Penjualan</h3>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <form @submit.prevent="onSubmit">
              <!-- From input -->
              <template v-for="count in countItem">
                <item-transaction
                  :key="count"
                  :count="count"
                ></item-transaction>
              </template>
              <!--/ Form input -->
              <!-- Sum -->
              <div class="row">
                <div class="col-sm-12">
                  <span class="float-right">
                    Total: Rp20.000
                  </span>
                </div>
              </div>
              <!-- /Sum -->
              <!-- Button -->
              <div class="row mt-4">
                <div class="col-sm-12">
                  <button class="btn btn-primary float-right" type="submit">
                    Selesai
                  </button>
                  <button
                    class="btn btn-success float-right mr-2"
                    type="button"
                    @click.prevent="onClickAddGoods"
                  >
                    Tambah Barang
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-sm-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*global Swal, EventBus */
import ItemTransaction from "./components/ItemTransaction";
export default {
  components: {
    "item-transaction": ItemTransaction,
  },
  data() {
    return {
      countItem: 1,
    };
  },
  methods: {
    onSubmit() {
      EventBus.$emit("submit-clicked");
      Swal.fire({
        title: "Selesaikan transaksi?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        text: "Total: Rp20.000",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Sukses!", "Transaksi berhasil.", "success");
        }
      });
    },
    onClickAddGoods() {
      this.countItem++;
    },
  },
};
</script>
