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
                  :categories="items"
                ></item-transaction>
              </template>
              <div class="row mt-4">
                <div class="col-sm-8">
                  <button
                    class="btn btn-danger float-left mr-2"
                    type="button"
                    @click.prevent="onClickAddItems(false)"
                  >
                    Hapus Barang
                  </button>
                  <button
                    class="btn btn-success float-left mr-2"
                    type="button"
                    @click.prevent="onClickAddItems(true)"
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
import { mapGetters, mapActions, mapMutations } from "vuex";
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
    ...mapActions(["fetchItems"]),
    ...mapMutations(["emptyCart"]),
    onSubmit() {
      EventBus.$emit("submit-clicked");

      let sumOfPrice = this.countPrice();

      Swal.fire({
        title: "Selesaikan transaksi?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        text: `Total: Rp${sumOfPrice.toLocaleString("id-ID")}`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Sukses!", "Transaksi berhasil.", "success");
          }
        })
        .finally(() => {
          this.emptyCart();
        });
    },
    onClickAddItems(status) {
      if (status) {
        this.countItem++;
      } else {
        this.countItem--;
      }
    },
    countPrice() {
      let x = 0;
      this.cart.forEach((item) => {
        x += item.price;
      });
      return x;
    },
  },
  computed: mapGetters(["items", "cart"]),
  async mounted() {
    await this.fetchItems();
  },
};
</script>
