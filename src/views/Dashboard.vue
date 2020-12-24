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
                <span class="info-box-text">Motor : 100</span>
                <span class="info-box-text">Mobil : 100</span>
                <span class="info-box-text">Karpet : 100</span>
                <span class="info-box-text">Motor : 100</span>
                <span class="info-box-text">Mobil : 100</span>
                <span class="info-box-number">Total : 500</span>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="small-box bg-gradient-success shadow">
              <div class="inner">
                <h3>Rp{{ income }}</h3>
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

export default {
  data() {
    return {
      income: 10000,
      sumOfItems: 500,
      currentDate: moment.format("dddd, LL"),
    };
  },
};
</script>
