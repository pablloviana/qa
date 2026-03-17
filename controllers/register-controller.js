import { RegisterService } from "../services/register-service.js?v=2";

export class RegisterController {
    register(e) {
        let registerService = new RegisterService();
        e.preventDefault();

        if (e.target[3].value == e.target[4].value) {
            let data = {
                name: e.target[0].value,
                last_name: e.target[1].value,
                email: e.target[2].value,
                password: e.target[3].value,
            };

            registerService.newClient(data);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'As senhas são incompatíveis! Verifique e tente novamente.',
                background: '#171717',
                color: '#fff',
                confirmButtonColor: '#8b5cf6'
            });
        }
    }
}
