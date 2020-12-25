<template>
  <div class="container">
    <div class="card shadow text-center">
      <h3 class="card-header text-center">Laporan</h3>
      <div class="card-body my-auto">
        <div class="container">
          <div class="row form-group text-center">
            <label for="date" class="col-form-label col-sm-4">Tanggal : </label>
            <input
              type="date"
              class="form-control col-sm-4"
              id="date"
              name="date"
              @change="onClickDate"
              :value="datepick"
            />
            <div class="col-sm-4">
              <button
                class="btn btn-success mx-1 px-3"
                @click.prevent="onClickSavePDF"
              >
                Simpan PDF <i class="fas fa-file-pdf ml-2"></i>
              </button>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Kuantitas</th>
                    <th>Keterangan</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Start Looping -->
                  <template v-for="(item, index) in items">
                    <tr :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.category }}</td>
                      <td>{{ item.qty }}</td>
                      <td>{{ item.information }}</td>
                      <td>Rp{{ item.price.toLocaleString("id-ID") }}</td>
                    </tr>
                  </template>
                  <!-- End Looping -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="reportModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Simpan PDF
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container justify-content-center text-center">
              <button class="btn btn-info mx-1">Harian</button>
              <button class="btn btn-info mx-1">Bulanan</button>
              <button class="btn btn-info mx-1">Tahunan</button>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal -->
  </div>
</template>

<script>
/* global  moment, $*/
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      datepick: `${moment.get("year")}-${moment.get("month")}-${moment.get(
        "date"
      )}`,
      date: moment.date(),
      month: moment.month(),
      year: moment.year(),
      items: [],
    };
  },
  methods: {
    ...mapActions(["fetchDailyTransaction"]),
    onClickDate() {
      this.datepick = document.getElementById("date").value;
    },
    onClickSavePDF() {
      $("#reportModal").modal("show");
    },
    dataProcess() {
      this.dailyTransaction.forEach((transaction) => {
        transaction.item.forEach((i) => {
          let item = {};
          item.name = i.name;
          item.category = i.category.category;
          item.qty = i.qty;
          item.information = i.information;
          item.price = i.price;

          this.items.unshift(item);
        });
      });

      console.log(this.items);
    },
  },
  async mounted() {
    await this.fetchDailyTransaction({
      date: this.date,
      month: this.month,
      year: this.year,
    });
    this.dataProcess();
  },
  computed: mapGetters(["dailyTransaction"]),
};
</script>
