document.addEventListener('DOMContentLoaded', function() {
    let produtos = [];
    let registros = [];

    document.getElementById('formulario').addEventListener('submit', function(event) {
        event.preventDefault(); 

        if (!this.checkValidity()) {
            event.stopPropagation(); 
        } else {
            adicionarProduto();
        }

        this.classList.add('was-validated');
    });

    document.getElementById('retirada-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

      
        if (!this.checkValidity()) {
            event.stopPropagation(); 
        } else {
            retirarProduto();
        }

        this.classList.add('was-validated');
    });

    function adicionarProduto() {
        const nomeProduto = document.getElementById('nome-produto').value.trim();
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const descricao = document.getElementById('descricao').value.trim();
        const dataHora = new Date().toLocaleString();
        const usuario = prompt('Digite o nome do usuário que está adicionando o produto:');

        const codigoProduto = Math.floor(Math.random() * 1000) + 1;

        const produtoExistente = produtos.find(produto => produto.nome === nomeProduto);
        if (produtoExistente) {
            
            produtoExistente.quantidade += quantidade;
        } else {
            
            produtos.push({
                codigo: codigoProduto,
                nome: nomeProduto,
                quantidade: quantidade,
                descricao: descricao
            });
        }

        registros.push({
            tipo: 'Adição',
            usuario: usuario,
            dataHora: dataHora,
            detalhes: `Produto '${nomeProduto}' adicionado com sucesso.`
        });

        atualizarTabelaProdutos();
        atualizarRelatorio();

        document.getElementById('formulario').reset();
        document.getElementById('formulario').classList.remove('was-validated');
    }

    function retirarProduto() {
        const codigoProduto = parseInt(document.getElementById('codigo-produto-retirada').value);
        const quantidadeRetirada = parseInt(document.getElementById('quantidade-retirada').value);
        const dataHora = new Date().toLocaleString();
        const usuario = prompt('Digite o nome do usuário que está retirando o produto:');

        const produtoIndex = produtos.findIndex(produto => produto.codigo === codigoProduto);

        if (produtoIndex !== -1) {
            produtos[produtoIndex].quantidade -= quantidadeRetirada;

            if (produtos[produtoIndex].quantidade < 0) {
                produtos[produtoIndex].quantidade = 0;
            }

            registros.push({
                tipo: 'Retirada',
                usuario: usuario,
                dataHora: dataHora,
                detalhes: `Retirada de ${quantidadeRetirada} unidades do produto '${produtos[produtoIndex].nome}'.`
            });

            atualizarTabelaProdutos();
            atualizarRelatorio();
        }

        document.getElementById('retirada-form').reset();
        document.getElementById('retirada-form').classList.remove('was-validated');
    }

    function atualizarTabelaProdutos() {
        const listaProdutosBody = document.getElementById('lista-produtos-body');
        listaProdutosBody.innerHTML = '';

        produtos.forEach(function(produto) {
            const newRow = `
                <tr>
                    <td>${produto.codigo}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.descricao}</td>
                </tr>
            `;
            listaProdutosBody.innerHTML += newRow;
        });
    }

    function atualizarRelatorio() {
        const relatorio = document.getElementById('relatorio');
        relatorio.innerHTML = '';

        registros.forEach(function(registro) {
            const newRow = `
                <tr>
                    <td>${registro.tipo}</td>
                    <td>${registro.usuario}</td>
                    <td>${registro.dataHora}</td>
                    <td>${registro.detalhes}</td>
                </tr>
            `;
            relatorio.innerHTML += newRow;
        });
    }
});
