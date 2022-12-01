import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;
const tokenName = import.meta.env.VITE_APP_TOKEN_NAME;

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
        const userToken = localStorage.getItem(tokenName);

        return (
            await this.api.post(this.baseUrl, link, {
                headers: { Authorization: `Bearer ${userToken}` },
            })
        ).data;
    }
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(link) {
        return (await this.api.put(`${this.baseUrl}/${link.id}`, link)).data;
    }
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}
export const linkService = new LinkService();
