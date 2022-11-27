import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;
class LinkService {
    constructor() {
        this.baseUrl = `${url}/api/link`;
        this.api = axios.create({
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }
    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }
    async create(link) {
        return (await this.api.post(this.baseUrl, link)).data; //
    }
    async login(user) {
        return (await this.api.get(this.baseUrl, user)).data;
    }
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(id, contact) {
        return (await this.api.put(`${this.baseUrl}/${id}`, contact)).data;
    }
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}
export const linkService = new LinkService();
