import { HttpService } from "./http-service.js";

export class LoginService {
    constructor() {
        this._http = new HttpService();
        this.seedAdminUser();
    }

    seedAdminUser() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (!users.find(u => u.email === "pabllo.oliveira@gmail.com")) {
            users.push({
                name: "Pabllo",
                last_name: "Oliveira",
                email: "pabllo.oliveira@gmail.com",
                password: "123456"
            });
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    login(data) {
        return new Promise((resolve, reject) => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(u => u.email === data.email && u.password === data.password);

            if (user) {
                this.set_token("mock-token-" + user.email);
                resolve({ token: "mock-token-" + user.email });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops!',
                    text: 'Usuário ou senha inválidos.',
                    background: '#171717',
                    color: '#fff',
                    confirmButtonColor: '#8b5cf6'
                });
                reject("Usuário ou senha inválidos.");
            }
        });
    }

    set_token(token) {
        localStorage.setItem("token", token);
        window.location.href = "../admin.html";
    }
}
