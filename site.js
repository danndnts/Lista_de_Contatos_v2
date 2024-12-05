// Referências aos elementos HTML
let appForm = document.getElementById('app-form');
let listaPessoas = document.getElementById('listaPessoas');
let btnOrdenar = document.getElementById('btnOrdenar');
let searchInput = document.getElementById('searchInput');

// Lista de pessoas
let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

// Inicializa a exibição da lista
function mostrarLista() {
    if (!listaPessoas) return;

    listaPessoas.innerHTML = '';
    for (let pessoa of pessoas) {
        let itemEl = document.createElement('li');
        itemEl.innerHTML = `
            <strong>${pessoa.nome} ${pessoa.sobrenome}</strong>
            <p>Telefone: ${pessoa.telefone}</p>
            <p>Email: ${pessoa.email}</p>
            <p>Endereço: ${pessoa.rua}, ${pessoa.nrua}, ${pessoa.cidade} - ${pessoa.estado}, CEP: ${pessoa.cep}</p>
        `;
        listaPessoas.appendChild(itemEl);
    }
}

// Adiciona nova pessoa
if (appForm) {
    appForm.onsubmit = function (e) {
        e.preventDefault();
        let pessoa = {
            nome: e.target.pessoaNome.value,
            sobrenome: e.target.pessoaSobrenome.value,
            telefone: e.target.pessoaTelefone.value,
            email: e.target.pessoaEmail.value,
            rua: e.target.pessoaRua.value,
            nrua: e.target.numeroRua.value,
            cep: e.target.pessoaCep.value,
            cidade: e.target.pessoaCidade.value,
            estado: e.target.pessoaEstado.value,
        };

        pessoas.push(pessoa);
        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        alert('Pessoa cadastrada com sucesso!');
        appForm.reset();
    };
}

// Ordena a lista
if (btnOrdenar) {
    btnOrdenar.onclick = function () {
        pessoas.sort((a, b) => (a.nome + a.sobrenome).localeCompare(b.nome + b.sobrenome));
        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        mostrarLista();
    };
}

// Busca na lista
if (searchInput) {
    searchInput.oninput = function () {
        let query = searchInput.value.toLowerCase();
        let filtrados = pessoas.filter(p =>
            (p.nome + p.sobrenome + p.telefone).toLowerCase().includes(query)
        );

        listaPessoas.innerHTML = '';
        for (let pessoa of filtrados) {
            let itemEl = document.createElement('li');
            itemEl.innerHTML = `
                <strong>${pessoa.nome} ${pessoa.sobrenome}</strong>
                <p>Telefone: ${pessoa.telefone}</p>
                <p>Email: ${pessoa.email}</p>
                <p>Endereço: ${pessoa.rua}, ${pessoa.nrua}, ${pessoa.cidade} - ${pessoa.estado}, CEP: ${pessoa.cep}</p>
            `;
            listaPessoas.appendChild(itemEl);
        }
    };
}

// Inicializa a página de lista
mostrarLista();
