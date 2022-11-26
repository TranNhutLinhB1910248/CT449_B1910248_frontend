import axios from "axios";
const url = "/api/product";

export default class API {
    //to get all the posts from the server
    //phuong thuc getAll
    static async getAllProduct() {
            const res = await axios.get(url);
            return res.data;
        }
        //to get single post by id
    static async getProductByID(id) {
            const res = await axios.get(`${url}/${id}`);
            return res.data;
        }
        //to insert post into database
    static async addProduct(post) {
            const res = await axios.post(url, post);
            return res.data;
        }
        //to update post into database
    static async updateProduct(id, post) {
            const res = await axios.patch(`${url}/${id}`, post);
            return res.data;
        }
        //to delete post 
    static async deleteProduct(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}