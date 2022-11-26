<template>
    <v-container>
       <v-alert border="center" dense text type="success" v-if="show">Xoá thành công!</v-alert>   
        <v-col style="text-align:left; right: 15px">
            <v-btn :to="{ name: 'add-user' }" prepend-icon="mdi-database-plus" color="primary">Thêm nhân viên</v-btn>      
        </v-col>
        <v-text-field
            v-model="search" prepend-inner-icon="mdi-magnify" label="Search">    
        </v-text-field>
        <v-simple-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Họ tên
                    </th>
                    <th class="text-left">
                        Quê quán
                    </th>
                    <th class="text-left">
                        Giới tính
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Chức vụ
                    </th>
                    <th class="text-left">
                        Mức lương
                    </th>
                    <th style="width: 220px">
                        Tùy biến
                        <v-btn-toggle v-model="toggle_exclusive">   
                            <v-btn @click="sortLowest"  style="height: 20px">
                                <i class="fa-solid fa-caret-up" style="color: red"></i>
                            </v-btn>
                            <v-btn @click="sortHighest" style=" height: 20px">
                                <i class="fa-solid fa-caret-down" style="color: red"></i>
                            </v-btn>
                        </v-btn-toggle>         
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in search_users" :key="post._id" height="80">
                    <td>{{ post.name }}</td>
                    <td>{{ post.address }}</td>
                    <td>{{ post.gender }}</td>     
                    <td>{{ post.email }}</td>
                    <td>{{ post.position }}</td>
                    <td>{{ post.salary }}</td>
                    <td >                       
                        <v-btn :to="{ name: 'edit-user', params: { id: post._id } }" color="success" margin_right="5px"  ><i class="fa fa-edit"></i></v-btn>
                        <v-btn @click="removeUser(post._id)" color="red"><i class="fas fa-trash" ></i></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-container>
</template>
  
<script>
import API from '@/services/api.user';
export default {
    name: "list-user",
    data() {
        return {
            search: '',
            users: [],
        };
    },
    async created() {
        this.users = await API.getAllUser();
    },
    methods: {
        async removeUser(id) {
            const response = await API.deleteUser(id);
            this.created();
            this.show = true;
        },
        async created() {
            this.users = await API.getAllUser();
        },
        sortLowest() {
            this.users.sort((a,b) => a.name > b.name ? 1 : -1);
        },
        sortHighest() {
            this.users.sort((a,b) => a.name < b.name ? 1 : -1);
        },
        
    },
    computed: {
        search_users(){
            return this.users.filter(post => 
                post.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }

    }
};
</script>