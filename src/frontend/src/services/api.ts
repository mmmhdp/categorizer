import axios from 'axios';

interface CreateSite {
    url: string;
}
interface CreateSubPage {
    url: string;
}

interface RecordDto {
    id: number;
    title: string;
    video_link: string;
    annotation_length: number;
    article_length: number;
    start_timecode: string;
    end_timecode: string;
    preview_picture: string;
    published: boolean;
    screenshot_timing: number;
}

const BASE_URL = "http://localhost:5000";

const ApiService = {
    async createSite(data: CreateSite) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/websites/create`, data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async createSubPage(data: CreateSubPage) {
        try {
            const response = await axios
            .post(`${BASE_URL}/api/v1/pages/create`, data)
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async getWebsiteByCategory(category: string) {
        const response = await axios.get(`${BASE_URL}/api/v1/websites/category/${category}`);
        return response;
    },    
    async getWebsiteById(data: number) {
        const response = await axios.get(`${BASE_URL}/api/v1/websites/${data}`);
        return response;
    },
    async getAllPagesBySiteId(data: number){
        const response = await axios.get(`${BASE_URL}/api/v1/pages/by_website/${data}`)
        return response;
    },
    async getPageById(data: number) {
        const response = await axios.get(`${BASE_URL}/api/v1/pages/${data}`);
        return response;
    },
    async checkSiteUrl(data: CreateSite) {
        const response = await axios.post(`${BASE_URL}/api/v1/websites/check_url`, data);
        return response;
    },
    async checkPageUrl(data: CreateSite) {
        const response = await axios.post(`${BASE_URL}/api/v1/pages/check_url`, data);
        return response;
    },
    async getAllSites(): Promise<RecordDto[]> {
        const response = await axios.get(`${BASE_URL}/api/v1/websites/all`);
        let result = await response;
        return result.data;
    },
};
export default ApiService;
