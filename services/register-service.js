import { HttpService } from "./http-service.js";

export class RegisterService {
    constructor() {
        this._http = new HttpService();
    }

    newClient(data) {
        return new Promise((resolve, reject) => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let exists = users.find(u => u.email === data.email);

            if (exists) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops!',
                    text: 'E-mail já cadastrado!',
                    background: '#171717',
                    color: '#fff',
                    confirmButtonColor: '#8b5cf6'
                });
                reject("E-mail já cadastrado!");
            } else {
                users.push(data);
                localStorage.setItem("users", JSON.stringify(users));
                this.set_token("mock-token-" + data.email);
                resolve({ token: "mock-token-" + data.email });
            }
        });
    }

    set_token(token) {
        localStorage.setItem("token", token);
        window.location.href = "../admin.html";
    }
}
