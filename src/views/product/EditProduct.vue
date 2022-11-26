<template lang="">
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-form ref="form" @submit.prevent="updateForm" v-model="valid" class="pa-5" enctype="multipart/form-data">
            <v-text-field v-model="products.name" label="Nhập tên sản phẩm" :rules="NameP"></v-text-field>
            <v-text-field v-model="products.price" label="Nhập giá" :rules="PriceP"></v-text-field>
            <v-text-field v-model="products.detail" label="Nhập chi tiết" :rules="DetailP"></v-text-field>
            <v-select v-model="products.category" label="Chọn danh mục" :items="categories" item-text="name" item-value="_id"></v-select>
            <v-file-input label="Chọn hình ảnh" @change="selectFile"></v-file-input>
            <v-img :src="`/${products.image}`" width="120px"></v-img>
            <v-btn type="submit" color="primary">Cập nhật</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "@/services/api.product";
import APII from "@/services/api.category";
export default {
  name: "add-product",
  data() {
    return {
      NameP: [
        (value) => !!value || "Tên không được để trống",
      ],
      PriceP: [
        (value) => !!value || "Giá không được để trống",
      ],
      DetailP: [
        (value) => !!value || "Chi tiết không được để trống",
      ],
      products: {
        name: "",
        price: "",
        detail: "",
        category: "",
        image: "",
      },
      categories:[

      ],

      image: "",
      show: false,
    };
  },
  async created() {
    this.products = await API.getProductByID(this.$route.params.id);
    this.categories = await APII.getAllCategory();
  },

  methods: {
    selectFile(file) {
      this.image = file;
    },
    async updateForm() {
      const formData = new FormData();

      formData.append("image", this.image);
      formData.append("name", this.products.name);
      formData.append("price", this.products.price);
      formData.append("detail", this.products.detail);
      formData.append("category", this.products.category);
      formData.append("old_image", this.products.image);
      if (this.$refs.form.validate()) {
        const res = await API.updateProduct(this.$route.params.id, formData);
        if (res) {
          this.show = true;
          this.$router.push({ path: '/list-product'});
        }
      }
    },
  },
};
</script>
<style lang=""></style>
