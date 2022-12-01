import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;
const tokenName = import.meta.env.VITE_APP_TOKEN_NAME;
const userToken = localStorage.getItem(tokenName);
class UserService {
    constructor() {
        this.baseUrl = `${url}/api/user`;
        this.api = axios.create({
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        this.fileApi = axios.create({
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`,
            },
        });
    }
    async login(user) {
        let result = await this.api.post(this.baseUrl, user);
        localStorage.setItem(tokenName, result.data.token);
        return result.data.user;
    }
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(id, contact) {
        return (await this.fileApi.put(`${this.baseUrl}/${id}`, contact)).data;
    }
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}
export const userService = new UserService();
