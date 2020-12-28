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
                    <th>#</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Kuantitas</th>
                    <th>Keterangan</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Start Looping -->
                  <template v-for="item in pageOfItems">
                    <tr :key="item.id">
                      <td>{{ item.id }}</td>
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
            <!-- Pagination -->
            <jw-pagination
              v-if="dataReady"
              :items="items"
              @changePage="onChangePage"
              :pageSize="5"
              :labels="customLabels"
            >
            </jw-pagination>
            <!-- /Pagination -->
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
              <!-- <button class="btn btn-info mx-1">Harian</button> -->
              <button
                type="button"
                @click.prevent="onClickMonthly"
                class="btn btn-info mx-1"
              >
                Bulanan
              </button>
              <button
                type="button"
                @click.prevent="onClickYearly"
                class="btn btn-info mx-1"
              >
                Tahunan
              </button>
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
/* eslint-disable no-unused-vars */
/* global , $, pdfFonts, pdfMake*/
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { SHOP_NAME, SHOP_ADDRESS } from "../../config/config";

const dataMonth = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default {
  data() {
    return {
      datepick: `${moment().get("year")}-${Number(moment().get("month")) +
        1}-${moment().get("date")}`,
      date: moment().date(),
      month: moment().month(),
      year: moment().year(),
      items: [],
      pageOfItems: [],
      dataReady: false,
      customLabels: {
        first: "Awal",
        last: "Akhir",
        previous: "<",
        next: ">",
      },
      pdfData: [],
    };
  },
  methods: {
    ...mapActions(["fetchDailyTransaction"]),
    async onClickMonthly() {
      await this.fetchDailyTransaction({
        date: this.date,
        month: this.month,
        year: this.year,
        data: "monthly",
      });
      this.monthlyPdf();
    },
    async onClickYearly() {
      await this.fetchDailyTransaction({
        date: this.date,
        month: this.month,
        year: this.year,
        data: "yearly",
      });
      this.yearlyPdf();
    },
    monthlyPdf() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      var docDefinition = {
        pageOrientation: "potrait",
        pageSize: "A4",
        content: [
          {
            text: "LAPORAN BULANAN",
            style: "header",
            alignment: "center",
            bold: true,
            margin: [0, 0, 0, 10],
            fontSize: 16,
          },
          {
            text: [
              `\t\t\t\t${SHOP_NAME} \n`,
              `\t\t\t\t${SHOP_ADDRESS}\n`,
              `\t\t\t\tBULAN ${dataMonth[this.month]} ${this.year}`,
            ],
            preserveLeadingSpace: true,
            style: "header",
            bold: false,
            margin: [0, 0, 0, 8],
          },
          this.tableMonthly([
            {
              text: "Tanggal",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Jenis Barang",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Kuantitas",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Sub Total",
              style: "tableHeader",
              alignment: "center",
            },
          ]),
        ],
        style: {
          subTittle: {
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
      $("#reportModal").modal("hide");
    },
    tableMonthly(columns) {
      return {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: {
              headerRows: 1,
              body: this.buildTableBodyMonthly(columns),
            },
          },
          { width: "*", text: "" },
        ],
      };
    },
    buildTableBodyMonthly(columns) {
      var body = [];

      body.push(columns);

      this.transaction.forEach((row) => {
        var dataRow = [];

        columns.forEach((column) => {
          if (column.text === "Tanggal") {
            dataRow.push({
              text: `${row.date} ${dataMonth[this.month]}`,
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Jenis Barang") {
            dataRow.push({
              text: row.name,
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Kuantitas") {
            dataRow.push({
              text: row.qty.toLocaleString("id-ID"),
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Sub Total") {
            dataRow.push({
              text: `Rp${row.price.toLocaleString("id-ID")}`,
              style: "tableContent",
              alignment: "center",
            });
          }
        });
        body.push(dataRow);
      });

      return body;
    },
    yearlyPdf() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      var docDefinition = {
        pageOrientation: "potrait",
        pageSize: "A4",
        content: [
          {
            text: `LAPORAN TAHUNAN ${this.year}`,
            style: {
              bold: true,
              fontSize: 14,
              alignment: "justify",
            },
            alignment: "center",
            margin: [0, 0, 0, 20],
          },
          {
            text: SHOP_NAME,
            style: "subTittle",
            alignment: "center",
          },
          {
            text: SHOP_ADDRESS,
            style: "subTittle",
            alignment: "center",
            margin: [0, 0, 0, 20],
          },
          this.tableYearly([
            {
              text: "#",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Bulan",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: "Pendapatan",
              style: "tableHeader",
              alignment: "center",
            },
          ]),
        ],
        style: {
          subTittle: {
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
      $("#reportModal").modal("hide");
    },
    tableYearly(columns) {
      return {
        columns: [
          { width: "*", text: "" },
          {
            table: {
              headerRows: 1,
              body: this.buildTableBodyYearly(columns),
            },
            alignment: "center",
            layout: "lightHorizontalLines",
          },
          { width: "*", text: "" },
        ],
      };
    },
    buildTableBodyYearly(columns) {
      var body = [];

      body.push(columns);

      this.transaction.forEach((row, index) => {
        var dataRow = [];

        columns.forEach((column) => {
          if (column.text === "#") {
            dataRow.push({
              text: index + 1,
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Bulan") {
            dataRow.push({
              text: dataMonth[row.month],
              style: "tableContent",
              alignment: "center",
            });
          } else if (column.text === "Pendapatan") {
            dataRow.push({
              text: `Rp${row.income.toLocaleString("id-ID")}`,
              style: "tableContent",
              alignment: "center",
            });
          }
        });
        body.push(dataRow);
      });

      return body;
    },
    async onClickDate() {
      this.dataReady = false;

      this.datepick = document.getElementById("date").value;

      this.date = this.datepick.split("-")[2];
      this.month = Number(this.datepick.split("-")[1]) - 1;
      this.year = this.datepick.split("-")[0];

      await this.fetchDailyTransaction({
        date: this.date,
        month: this.month,
        year: this.year,
        data: "daily",
      });
      this.dataProcess();
      this.dataReady = true;
    },
    onClickSavePDF() {
      $("#reportModal").modal("show");
    },
    dataProcess() {
      this.items = [];
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

      this.items.forEach((item, index) => {
        item.id = index + 1;
      });
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
  async mounted() {
    await this.fetchDailyTransaction({
      date: this.date,
      month: this.month,
      year: this.year,
      data: "daily",
    });
    this.dataProcess();
    this.dataReady = true;
  },
  computed: mapGetters(["dailyTransaction", "transaction"]),
};
</script>
