const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	res.render("index/home");
}));

router.get("/home", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Home"
	};
	res.render("index/home", opcoes);
}));

router.get("/sobre", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Sobre Nós"
	};
	res.render("index/sobre", opcoes);
}));

router.get("/daycare", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Daycare"
	};
	res.render("index/daycare", opcoes);
}));

router.get("/hotel", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Hotel"
	};
	res.render("index/hotel", opcoes);
}));

router.get("/adestramento", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Adestramento"
	};
	res.render("index/adestramento", opcoes);
}));

router.get("/banhotosa", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Banho e Tosa"
	};
	res.render("index/banhotosa", opcoes);
}));

router.get("/clinica", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Clínica Veterinária"
	};
	res.render("index/clinica", opcoes);
}));

router.get("/loginMembros", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Login Membros"
	};
	res.render("index/loginMembros", opcoes);
}));

router.get("/areaMembros", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Login Membros"
	};
	res.render("index/areaMembros", opcoes);
}));

router.get("/taxidog", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Táxi Dog"
	};

	res.render("index/taxidog", opcoes)
}))

router.get("/produtos", wrap(async (req, res) => {

    // Página atual
    const currentPage = parseInt(req.query.page) || 1;

    // Produtos por página
    const limit = 20;

    let produtosDB = [];

    // Buscar produtos no banco
    await sql.connect(async sql => {
        produtosDB = await sql.query(`
            SELECT proCodi, proNome, ProPrec FROM dogues_produto
        `);
    });

    // Total de produtos
    const total = produtosDB.length;
    const totalPages = Math.ceil(total / limit);

	const maxPagesToShow = 5;

	// Calcula o intervalo de páginas a serem exibidas
	let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
	let endPage = startPage + maxPagesToShow - 1;

	// Corrige para não passar do total
	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, endPage - maxPagesToShow + 1);
	}


    // Produtos paginados
    const start = (currentPage - 1) * limit;
    const end = start + limit;

    const produtosPaginados = produtosDB.slice(start, end);

    // Renderizar página
    res.render("index/produtos", {
        produtos: produtosPaginados,  // produtos da página
        produtosAll: produtosDB,      // todos os produtos
        currentPage,
        totalPages,
		startPage,
		endPage
    });
}));


router.get("/cadastrarProduto", wrap(async (req, res) => {
	let opcoes = {
		titulo: "cadastrarProduto"
	};

	res.render("index/cadastrar", opcoes)
}))

router.post("/api/cadastrarproduto", wrap(async (req, res) => {
	let produto = req.body

	if (!produto.ProNome) {
		res.status(400).json("Nome inválido!");
		return;
	}

	if (!produto.ProPrec) {
		res.status(400).json("Preço inválido!");
		return;
	}

	if (!produto.ProQtdA) {
		res.status(400).json("Quandidade inválida!");
		return;
	}

	await sql.connect(async sql => {
		let parametros = [
			produto.ProNome,
			parseFloat(produto.ProPrec),
			parseInt(produto.ProQtdA)
		]
		
		produtos = await sql.query("INSERT INTO dogues_produto (ProNome, ProPrec, ProQtdA) VALUES (?, ?, ?)", parametros)
	})

	res.json("Rafa, te amo")

}))


module.exports = router;
