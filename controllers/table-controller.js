export function tables(data) {
    const datatablesSimple = document.getElementById("datatablesSimple");

    if (datatablesSimple) {
        let datatable = new simpleDatatables.DataTable(datatablesSimple, {
            labels: {
                placeholder: "Pesquisar...",
                perPage: "{select} itens por página",
                noRows: "Nenhum registro encontrado",
                info: "Mostrando {start} a {end} de {rows} registros",
            }
        });

        let myData = {
            headings: ["ID", "Nome", "Categoria", "Opções"],
            data: data,
        };

        datatable.insert(myData);
    }
}
