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
/*global Swal, EventBus, moment, pdfMake, pdfFonts */
import ItemTransaction from "./components/ItemTransaction";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { SHOP_NAME, SHOP_ADDRESS } from "../../config/config";

export default {
  components: {
    "item-transaction": ItemTransaction,
  },
  data() {
    return {
      countItem: 1,
      date: moment.date(),
      month: moment.month(),
      year: moment.year(),
    };
  },
  methods: {
    ...mapActions(["fetchItems", "addTransaction"]),
    ...mapMutations(["emptyCart"]),
    createBills() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      var docDefinition = {
        pageOrientation: "potrait",
        pageSize: {
          width: 215,
          height: "auto",
        },
        content: [
          {
            text: `${SHOP_NAME}`,
            style: "header",
            alignment: "center",
          },
          {
            text: `${SHOP_ADDRESS}`,
            style: "headerAddress",
            alignment: "center",
            margin: [0, 10, 0, 0],
          },
          {
            text: `${moment.format("dddd, H:mm")} \n ${moment.format(
              "Do MMMM YYYY"
            )}`,
            style: "headerAddress",
            alignment: "center",
            margin: [0, 0, 0, 20],
          },
          // Table
          this.table([
            {
              text: "Jenis",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Kuantitas",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Total",
              style: "tableHeader",
              alignment: "center",
            },
          ]),
          {
            text: "** TERIMA KASIH **",
            style: "headerAddress",
            alignment: "center",
            margin: [0, 15],
          },
        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: "justify",
            margin: [3, 2],
          },
          headerAddress: {
            fontSize: 12,
            alignment: "justify",
          },
          tableHeader: {
            fontSize: 12,
            alignment: "justify",
            bold: true,
          },
          tableContent: {
            fontSize: 11,
            alignment: "justify",
          },
        },
      };

      pdfMake.createPdf(docDefinition).open();
    },
    buildTableBody(columns) {
      var body = [];

      body.push(columns);

      this.cart.forEach((item) => {
        var dataRow = [];

        columns.forEach((column) => {
          if (column.text === "Jenis") {
            dataRow.push({
              text: item.category.category,
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Kuantitas") {
            dataRow.push({
              text: item.qty,
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Total") {
            dataRow.push({
              text: `Rp${item.price.toLocaleString("id-ID")}`,
              style: "tableContent",
              alignment: "center",
            });
          }
        });

        body.push(dataRow);
      });

      // Set sum
      body.push([
        {
          colSpan: 3,
          text: `TOTAL  \t Rp${this.countPrice().toLocaleString("id-ID")}`,
          alignment: "right",
          bold: true,
          fontSize: 12,
        },
      ]);

      return body;
    },
    table(columns) {
      return {
        table: {
          headerRows: 1,
          body: this.buildTableBody(columns),
        },
        layout: "lightHorizontalLines",
      };
    },
    onSubmit() {
      EventBus.$emit("submit-clicked");

      let sumOfPrice = this.countPrice();

      let payload = {
        date: this.date,
        month: this.month,
        year: this.year,
        total: sumOfPrice,
        item: this.cart,
      };

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
            this.createBills();
            this.addTransaction(payload).then(() => {
              Swal.fire("Sukses!", "Transaksi berhasil.", "success").then(
                () => {
                  this.$router.go();
                }
              );
            });
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
