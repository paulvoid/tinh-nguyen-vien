import axios from "axios";
import {getCookie,setCookie} from "cookies-next";

const API_URL = "http://localhost:3000/api/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        return response
      });
  }
  register(name: string, email: string, password: string, dateOfBirth: string, phoneNumber: string, address: string, indentifyCard: string, dateOfIssue: string, placeOfIssue: string, unit: string) {
    return axios
      .post(API_URL + "register", {
        name,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        address,
        indentifyCard,
        dateOfIssue,
        placeOfIssue,
        unit
      })
      .then((response) => {
        return response
      });
  }
  logout() {
    const token = getCookie('token');
    setCookie('token', '', {maxAge: 0});
  }
}
export default new AuthService();
