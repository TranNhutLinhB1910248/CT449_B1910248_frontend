import Vue from "vue";
import VueRouter from "vue-router";

import AddCategory from "../views/category/AddCategory.vue";
import ListCategory from "../views/category/ListCategory.vue";
import EditCategory from "../views/category/EditCategory.vue";

import AddProduct from "../views/product/AddProduct.vue";
import EditProduct from "../views/product/EditProduct.vue";
import ListProduct from "../views/product/ListProduct.vue";

import AddUser from "../views/user/AddUser.vue";
import EditUser from "../views/user/EditUser.vue";
import ListUser from "../views/user/ListUser.vue";



Vue.use(VueRouter);

const routes = [
    {
        path: "/add-category",
        name: "add-category",
        component: AddCategory,
    },
    {
        path: "/list-category",
        name: "list-category",
        component: ListCategory,
    },
    {
        path: "/edit-category/:id",
        name: "edit-category",
        component: EditCategory,
    },
    {
        path: "/add-product",
        name: "add-product",
        component: AddProduct,
    },
    {
        path: "/edit-product/:id",
        name: "edit-product",
        component: EditProduct,
    },
    {
        path: "/list-product",
        name: "list-product",
        component: ListProduct,
    },
    {
        path: "/add-user",
        name: "add-user",
        component: AddUser,
    },

    {
        path: "/list-user",
        name: "list-user",
        component: ListUser,
    },

    {
        path: "/edit-user/:id",
        name: "edit-user",
        component: EditUser,
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;