import axios from "axios";
const url = "/api/category";

export default class API {
    //to get all the posts from the server
    //phuong thuc getAll
    static async getAllCategory() {
            const res = await axios.get(url);
            return res.data;
        }
        //to get single post by id
    static async getCategoryByID(id) {
            const res = await axios.get(`${url}/${id}`);
            return res.data;
        }
        //to insert post into database
    static async addCategory(post) {
            const res = await axios.post(url, post);
            return res.data;
        }
        //to update post into database
    static async updateCategory(id, post) {
            const res = await axios.patch(`${url}/${id}`, post);
            return res.data;
        }
        //to delete post 
    static async deleteCategory(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}