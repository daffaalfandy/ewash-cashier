<template>
  <div class="container">
    <div class="card shadow text-center">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-6 ">
            <h3 class="text-center float-right">
              Data Barang
            </h3>
          </div>
          <div class="col-sm-6">
            <button
              class="btn btn-primary float-right px-4"
              type="button"
              @click.prevent="onClickModal('add')"
            >
              Tambah Barang
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Jenis</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <!-- Item list -->
              <inventory-list
                v-on:edit-clicked="onClickModal('edit')"
              ></inventory-list>
              <!-- /Item list -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="inventoryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ editMode ? "Edit Barang" : "Tambah Barang" }}
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
            <div class="container">
              <form action="POST" @submit.prevent="">
                <div class="form-group row">
                  <label
                    for="category"
                    class="col-sm-5 col-form-label text-center"
                    >Jenis Barang:</label
                  >
                  <input
                    type="text"
                    class="form-control col-sm-7"
                    id="category"
                    :name="item.category"
                  />
                </div>
                <div class="form-group row">
                  <label for="price" class="col-sm-5 col-form-label text-center"
                    >Harga Barang:</label
                  >
                  <input
                    type="number"
                    class="form-control col-sm-7"
                    id="price"
                    :name="item.price"
                  />
                </div>
              </form>
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
            <button type="button" class="btn btn-primary">
              {{ editMode ? "Edit Barang" : "Tambah Barang" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal -->
  </div>
</template>

<script>
/*global $*/
import InventoryList from "./components/InventoryList";

export default {
  components: {
    "inventory-list": InventoryList,
  },
  data() {
    return {
      editMode: false,
      item: {
        name: "",
        price: 0,
      },
    };
  },
  methods: {
    onClickModal(type) {
      if (type === "add") {
        this.editMode = false;
        this.setModal();
      } else if (type === "edit") {
        this.editMode = true;
        this.setModal();
      }
    },
    setModal() {
      if (!this.editMode) {
        this.item.name = "";
        this.item.price = 0;
      } else if (this.editMode) {
        console.log("edit mode");
      }
      $("#inventoryModal").modal("show");
    },
  },
};
</script>
