<template>
  <div class="container">
    <div class="card shadow text-center">
      <h3 class="card-header text-center">Dashboard</h3>
      <div class="card-body">
        <h5><i class="fas fa-calendar-alt mx-2"></i> {{ currentDate }}</h5>
        <div class="row my-5">
          <div class="col-sm-6">
            <div class="info-box">
              <span class="px-5 info-box-icon bg-info"
                ><i class="fas fa-clipboard-list"></i
              ></span>
              <div class="info-box-content">
                <span class="info-box-number">Barang Masuk </span>
                <template v-for="(item, index) in items">
                  <span class="info-box-text" :key="index"
                    >{{ item.name }}: {{ item.qty }}</span
                  >
                </template>
                <span class="info-box-number">Total: {{ sumOfItems }}</span>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="small-box bg-gradient-success shadow">
              <div class="inner">
                <h3>Rp{{ income.toLocaleString("id-ID") }}</h3>
                <p>Jumlah Pemasukan Hari Ini</p>
              </div>
              <div class="icon">
                <i class="fas fa-wallet"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*global moment*/
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      income: 0,
      sumOfItems: 0,
      currentDate: moment.format("dddd, LL"),
      date: moment.date(),
      month: moment.month(),
      year: moment.year(),
      items: [],
    };
  },
  methods: {
    ...mapActions(["fetchDailyTransaction"]),
    processData() {
      this.dailyTransaction.forEach((transaction) => {
        this.income += transaction.total;
        transaction.item.forEach((x) => {
          let category = {
            id: x.category._id,
            name: x.category.category,
            qty: Number(x.qty),
          };
          let available = false;
          this.items.filter((item) => {
            if (category.id === item.id) {
              item.qty += category.qty;
              available = true;
            }
          });
          if (!available) {
            this.items.unshift(category);
          }
        });
      });
      this.items.forEach((item) => {
        this.sumOfItems += item.qty;
      });
    },
  },
  async mounted() {
    await this.fetchDailyTransaction({
      date: this.date,
      month: this.month,
      year: this.year,
    });
    this.processData();
  },
  computed: mapGetters(["dailyTransaction"]),
};
</script>
