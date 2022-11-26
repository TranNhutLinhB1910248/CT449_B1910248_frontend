<template lang="">
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-form ref="form" @submit.prevent="updateForm" v-model="valid" class="pa-5" enctype="multipart/form-data">
            <v-text-field v-model="categories.name" label="Nhập tên danh mục" :rules="NameC"></v-text-field>
            <v-text-field v-model="categories.description" label="Nhập mô tả" :rules="DescriptionC"></v-text-field>
            <v-btn type="submit" color="primary">Cập nhật</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script>
import API from "@/services/api.category";
export default {
  name: "add-category",
  data() {
    return {
      NameC: [
        (value) => !!value || "Tên không được để trống",
        ],
      DescriptionC : [
        (value) => !!value || "Mô tả không được để trống "
        ],
      categories: {
        name: "",
        description: "",
      },
      show: false,
    };
  },
  async created() {
    const res = await API.getCategoryByID(this.$route.params.id);
    this.categories = res;
  },
  methods: {
    async updateForm() {
      const formData = new FormData();
      formData.append("name", this.categories.name);
      formData.append("description", this.categories.description);
      if (this.$refs.form.validate()) {
        const res = await API.updateCategory(this.$route.params.id, formData);
        if (res) {
          this.show = true;
          this.$router.push({ path: '/list-category'});
        }
      }
    },
  },
};
</script>
<style lang=""></style>
