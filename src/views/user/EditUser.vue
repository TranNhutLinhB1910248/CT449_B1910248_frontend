<template lang="">
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-form ref="form" @submit.prevent="updateForm" v-model="valid" class="pa-5" enctype="multipart/form-data">
            <v-text-field v-model="users.name" label="Nhập tên" :rules="NameU"></v-text-field>
            <v-text-field v-model="users.address" label="Nhập địa chỉ" :rules="AddressU"></v-text-field>
            <v-radio-group v-model="users.gender" label="Giới tính"  :rules="[v => !!v || 'Giới tính không được để trống']" required column >
              <v-radio label="Nam" value="Nam"></v-radio>
              <v-radio label="Nữ" value="Nữ" ></v-radio>
            </v-radio-group>       
            <v-text-field v-model="users.email" label="Nhập email" :rules="EmailU"></v-text-field>
            <v-select v-model="users.position" :items="positions" :rules="[v => !!v || 'Chức vụ không được để trống']" label="Chức vụ" required></v-select>
            <v-select v-model="users.salary" :items="salaries" :rules="[v => !!v || 'Mức lương không được để trống']" label="Mức lương" required></v-select>
            <v-text-field v-model="users.password" label="Nhập mật khẩu" :rules="PasswordU" required></v-text-field> 
            <v-btn type="submit" color="primary">Cập nhật</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script>
import API from "@/services/api.user";
export default {
  name: "add-user",
  data() {
    return {
      NameU: [
        (value) => !!value || "Tên không được để trống",
      ],
      AddressU: [
        (value) => !!value || "Địa chỉ không được để trống",
      ],
      EmailU: [
        value => !!value || 'E-mail không được để trống',
        value => /.+@.+\..+/.test(value) || 'E-mail phải hợp lệ',
      ],
      PasswordU: [
        (value) => !!value || "Mật khẩu không được để trống",
      ],
      select: null,
      
      positions: [
        'Nhân viên bán hàng',
        'Nhân viên quản lý sales',
        'Nhân viên tư vấn',
        'Thư kí',
      ],

      salaries: [
        'Mức 1: 5,945,100 VND',
        'Mức 2: 6,436,800 VND',
        'Mức 3: 6,928,500 VND',
      ],

      users: {
        name: "",
        address: "",
        gender: "",  
        email: "",
        position: "",
        salary: "",
        password: "",
      },
      show: false,
    };
  },
  async created() {
    const res = await API.getUserByID(this.$route.params.id);
    this.users = res;
  },
  methods: {
    async updateForm() {
      const formData = new FormData();
      formData.append("name", this.users.name);
      formData.append("address", this.users.address);
      formData.append("gender", this.users.gender);  
      formData.append("email", this.users.email);
      formData.append("position", this.users.position);
      formData.append("salary", this.users.salary);
      formData.append("password", this.users.password);
      if (this.$refs.form.validate()) {
        const res = await API.updateUser(this.$route.params.id, formData);
        if (res) {
          this.show = true;
          this.$router.push({ path: '/list-user'});
        }
      }
    },
  },
};
</script>
<style lang=""></style>
