<template>
    <v-container>
        <v-alert border="center" dense text type="success" v-if="show">Xoá thành công!</v-alert>
        <v-col style="text-align:left; right: 15px">
            <v-btn :to="{ name: 'add-product' }" prepend-icon="mdi-database-plus" color="primary">Thêm sản phẩm</v-btn>
        </v-col>
        <v-text-field
            v-model="search" prepend-inner-icon="mdi-magnify" label="Search">
            
        </v-text-field>
        <v-simple-table>
            <thead>
                <tr>
                    <th>
                        Tên sản phẩm
                    </th>
                    <th>
                        Giá
                    </th>
                    <th>
                        Mô tả
                    </th>
                    <th>
                        Danh mục
                    </th>
                    <th>
                        Hình ảnh
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
                <tr v-for="post in search_products" :key="post._id" height="80" >
                    <td>{{ post.name }}</td>
                    <td>{{ post.price }}</td>
                    <td>{{ post.detail }}</td>            
                    <td>
                        <span v-for="get in categories" :key="get._id">
                            <span v-if="post.category == get._id">{{ get.name }}</span>
                        </span>
                    </td>
                    <td>
                        <v-img height="50" width="50" cover class="bg-grey-lighten-2" :src="`/${post.image}`"></v-img>
                    </td>
                    <td >                       
                        <v-btn :to="{ name: 'edit-product', params: { id: post._id } }" color="success" ><i class="fa fa-edit"></i></v-btn>
                        <v-btn @click="removeProduct(post._id)" color="red"><i class="fas fa-trash" ></i></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-container>
</template>
  
<script>
import API from '@/services/api.product';
import APII from '@/services/api.category';

export default {
    name: 'list-product',
    data() {
        return {
            search: '',
            products: [],
            categories:[],
        };
    },
    async created() {       
        this.products = await API.getAllProduct();
        this.categories = await APII.getAllCategory();     
    },

    methods: {
        async removeProduct(id) {
            const res = API.deleteProduct(id);
            this.created();
            this.show =true;
        },
        async created() {       
            this.products = await API.getAllProduct();
            this.categories = await APII.getAllCategory();
        },

        sortLowest() {
            this.products.sort((a,b) => a.price > b.price ? 1 : -1);
        },
        sortHighest() {
            this.products.sort((a,b) => a.price < b.price ? 1 : -1);
        },
            
    },
    computed: {
        search_products(){
            return this.products.filter(post => 
                post.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
};
</script>