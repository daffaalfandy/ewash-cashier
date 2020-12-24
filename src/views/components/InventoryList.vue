<template>
  <tr class="align-middle">
    <td>{{ index + 1 }}</td>
    <td>{{ item.category }}</td>
    <td>Rp{{ Number(item.price).toLocaleString("id-ID") }}</td>
    <td class="py-0">
      <a class="btn" @click.prevent="onClickEdit">
        <i class="fas fa-edit text-primary"></i>
      </a>
      /
      <a class="btn" @click.prevent="onClickDelete">
        <i class="fas fa-trash-alt text-danger"></i>
      </a>
    </td>
  </tr>
</template>

<script>
/*global  Swal*/
import { mapActions } from "vuex";

export default {
  props: {
    item: Object,
    index: Number,
  },
  methods: {
    ...mapActions(["deleteItem"]),
    onClickEdit() {
      this.$emit("edit-clicked", this.item);
    },
    onClickDelete() {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan dapat mengulang ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus sekarang",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.value) {
          this.deleteItem({ _id: this.item._id }).then(() => {
            Swal.fire("Dihapus!", "Barang berhasil dihapus.", "success");
          });
        }
      });
    },
  },
};
</script>
