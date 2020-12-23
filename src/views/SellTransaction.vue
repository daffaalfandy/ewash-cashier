<template>
  <div class="container">
    <div class="card shadow text-center">
      <h3 class="card-header text-center">Transaksi Penjualan</h3>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <form @submit.prevent="onSubmit" method="POST">
              <!-- From input -->
              <template v-for="count in countItem">
                <item-transaction
                  :key="count"
                  :count="count"
                ></item-transaction>
              </template>
              <!--/ Form input -->
              <!-- Sum -->
              <!-- <div class="row">
                <div class="col-sm-12">
                  <span class="float-right">
                    Total: Rp20.000
                  </span>
                </div>
              </div> -->
              <!-- /Sum -->
              <!-- Button -->
              <div class="row mt-4">
                <div class="col-sm-8">
                  <button
                    class="btn btn-danger float-left mr-2"
                    type="button"
                    @click.prevent="onClickAddGoods(false)"
                  >
                    Hapus Barang
                  </button>
                  <button
                    class="btn btn-success float-left mr-2"
                    type="button"
                    @click.prevent="onClickAddGoods(true)"
                  >
                    Tambah Barang
                  </button>
                </div>
                <div class="col-sm-4">
                  <button
                    class="btn btn-primary float-right px-4"
                    type="submit"
                  >
                    Selesai
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
    onClickAddGoods(status) {
      if (status) {
        this.countItem++;
      } else {
        this.countItem--;
      }
    },
  },
};
</script>
