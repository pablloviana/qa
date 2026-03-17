export class HttpService {
    constructor() {
        this.api = "offline_mode"; 
        this._initDB();
    }

    _initDB() {
        if (!localStorage.getItem("categories")) {
            localStorage.setItem("categories", JSON.stringify([
                { id: 1, name: "Cadeiras", templates: [] },
                { id: 2, name: "Sofás", templates: [] }
            ]));
        }
        if (!localStorage.getItem("templates")) {
            localStorage.setItem("templates", JSON.stringify([]));
        }
    }

    get(url) {
        return new Promise((resolve, reject) => {
            resolve("{}");
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let categories = JSON.parse(localStorage.getItem("categories"));
                let templates = JSON.parse(localStorage.getItem("templates"));

                if (url.includes("models/recent") || url.includes("models") && !url.includes("login")) {
                    // return models
                    let res = {
                        _templates: templates,
                        _categories: categories
                    };
                    if (data && data.category_id) {
                        res._templates = templates.filter(t => t.category.id === data.category_id);
                        res.category = categories.find(c => c.id === data.category_id) || { name: 'Categoria' };
                    }
                    resolve(res);
                }
                else if (url.includes("categories") || url.includes("category/name")) {
                    resolve({ _categories: categories });
                }
                else if (url.includes("category/create")) {
                    categories.push({ id: Date.now(), name: data.name, templates: [] });
                    localStorage.setItem("categories", JSON.stringify(categories));
                    resolve({ success: true });
                }
                else if (url.includes("profile/edit")) {
                    resolve({ success: true });
                }
                else if (url.includes("profile")) {
                    let users = JSON.parse(localStorage.getItem('users') || "[]");
                    let user = users.find(u => "mock-token-" + u.email === data.token) || users[0] || {};
                    resolve({
                        name: user.name || "Administrador",
                        email: user.email || "pabllo.oliveira@gmail.com",
                        phone: user.phone || "(00) 00000-0000"
                    });
                }
                else if (url.includes("shop/model")) {
                    let template = templates.find(t => t.token === data.token);
                    resolve(template || {});
                }
                else if (url.includes("shop")) {
                    resolve({ _templates: templates, _categories: categories });
                }
                else {
                    resolve({});
                }
            }, 300);
        });
    }

    postSpecial(url, data) {
        return new Promise((resolve, reject) => {
           resolve({});
        });
    }
}
