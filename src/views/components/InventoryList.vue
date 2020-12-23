<template>
  <tr class="align-middle">
    <td>1.</td>
    <td>Mobil</td>
    <td>Rp20.000</td>
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
export default {
  methods: {
    onClickEdit() {
      this.$emit("edit-clicked");
    },
    onClickDelete() {
      console.log("delete item");
    },
  },
};
</script>
