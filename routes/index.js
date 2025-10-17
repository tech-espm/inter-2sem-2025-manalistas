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

router.get("/taxidog", wrap(async(req, res) => {
	let opcoes = {
		titulo: "Táxi Dog"
	};
	
	res.render("index/taxidog", opcoes)
}))

router.get("/produtos", wrap(async (req, res) => {
	let produtos;

	await sql.connect(async (sql) => {
		produtos = await sql.query("select id, nome from produto where idempresa = ? and idcliente = ?", [4, 6]);
	});

	let produtoA = {
		id: 1,
		nome: "Produto A",
		valor: 25
	};

	let produtoB = {
		id: 2,
		nome: "Produto B",
		valor: 15
	};

	let produtoC = {
		id: 3,
		nome: "Produto C",
		valor: 100
	};

	let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

	let opcoes = {
		titulo: "Listagem de Produtos",
		produtos: produtosVindosDoBanco
	};

	res.render("index/produtos", opcoes);
}));


module.exports = router;
