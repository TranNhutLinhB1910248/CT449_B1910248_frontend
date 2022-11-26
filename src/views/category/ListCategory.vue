<template>
    <v-container>
        <v-alert border="center" dense text type="success" v-if="show">Xoá thành công!</v-alert>

        <v-col style="text-align:left; right: 15px">
            <v-btn :to="{ name: 'add-category' }" prepend-icon="mdi-database-plus" color="primary">Thêm danh mục</v-btn>
        </v-col>
        <v-text-field
            v-model="search" prepend-inner-icon="mdi-magnify" label="Search">
            
        </v-text-field>
        <v-simple-table>
            <thead>
                <tr>
                    <th>
                        Tên danh mục
                    </th>
                    <th>
                        Mô tả
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
                <tr v-for="post in search_categories" :key="post._id" height="80">
                    
                    <td>{{ post.name }}</td>
                    <td>{{ post.description }}</td>
                    <td >                       
                        <v-btn :to="{ name: 'edit-category', params: { id: post._id } }" color="success" ><i class="fa fa-edit"></i></v-btn>
                        <v-btn @click="removeCategory(post._id)" color="red"><i class="fas fa-trash" ></i></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-container>
</template>
  
<script>
import API from '@/services/api.category';
export default {
    name: 'list-category',
    data() {
        return {
            search: '',
            categories: [],
        };
    },
    async created() {
        this.categories = await API.getAllCategory();
    },
    methods: {
        async removeCategory(id) {
            const res = API.deleteCategory(id);
            this.created();
            this.show =true;
        },
        async created() {
            this.categories = await API.getAllCategory();
        },
        sortLowest() {
            this.categories.sort((a,b) => a.name > b.name ? 1 : -1);
        },
        sortHighest() {
            this.categories.sort((a,b) => a.name < b.name ? 1 : -1);
        },
    },
    computed: {
        search_categories(){
            return this.categories.filter(post => 
                post.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
};
</script>