<template>
  <div class="container">
    <div class="card shadow text-center">
      <h3 class="card-header text-center">Dashboard</h3>
      <div class="card-body">
        <h5><i class="fas fa-calendar-alt mx-2"></i> {{ currentDate }}</h5>
        <div class="row my-5">
          <div class="col-sm-6">
            <div class="card mx-2 py-4 shadow text-center">
              <div class="card-body">
                <i class="fas fa-clipboard-list mx-2 text-primary"></i> Jumlah
                Barang Masuk : {{ sumOfItems }}
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card mx-2 py-4 shadow text-center">
              <div class="card-body">
                <i class="fas fa-wallet text-green mx-2"></i> Jumlah Pemasukan :
                Rp{{ income }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

moment.locale("id");

export default {
  data() {
    return {
      income: 10000,
      sumOfItems: 500,
      currentDate: moment().format("dddd, LL"),
    };
  },
};
</script>
