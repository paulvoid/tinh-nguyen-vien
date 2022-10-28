import axios from "axios";
import {getCookie,setCookie} from "cookies-next";

const API_URL = "http://localhost:3000/api/admin/";

class AdminService {
    addActivity(name: string, content: string, startDate: string, endDate: string, location: string) {
        return axios
            .post(API_URL + "create-activity", {
                name,
                content,
                startDate,
                endDate,
                location
            })
            .then((response) => {
                return response
            })
    }
    updateActivity(id: number, name: string, content: string, startDate: string, endDate: string, location: string) {
        return axios
            .post(API_URL + "update-activity", {
                id,
                name,
                content,
                startDate,
                endDate,
                location
            })
            .then((response) => {
                return response
            });
    }
    deleteActivity(id: number) {
        return axios
            .post(API_URL + "delete-activity", {
                id
            })
            .then((response) => {
                return response
            });
    }
}

export default new AdminService();