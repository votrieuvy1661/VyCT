import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;
class ImageService {
    constructor() {
        this.baseUrl = `${url}/api/image`;
        this.api = axios.create({
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }
    async create(image) {
        return (await this.api.post(this.baseUrl, image)).data;
    }
    get(name, author) {
        return `${url}/image/${author}/${name}`;
    }
    async update(id, contact) {
        return (await this.api.put(`${this.baseUrl}/${id}`, contact)).data;
    }
    async delete(name) {
        return (await this.api.delete(`${this.baseUrl}/${name}`)).data;
    }
}
export const imageService = new ImageService();
