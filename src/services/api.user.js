import axios from "axios";
const url = "/api/user";

export default class API {
    static async getAllUser() {
        const res = await axios.get(url);
        return res.data;
    }
    static async getUserByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    static async addUser(post) {
        for (const value of post.values()) {
            // console.log(value);
        }
        // console.log('sdsd');
        const res = await axios.post(url, post);
        // // console.log(res.data);
        return res.data;
    }
    static async updateUser(id, post) {
        for (const value of post.values()) {
            // console.log(value);
        }
        // console.log(id);
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }
    static async deleteUser(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}