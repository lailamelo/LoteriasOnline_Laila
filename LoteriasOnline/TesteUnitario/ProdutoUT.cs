using Microsoft.VisualStudio.TestTools.UnitTesting;
using LoteriasOnline.Controllers;
using LoteriasOnline.Models;

namespace TesteUnitario
{
    [TestClass]
    public class ProdutoUT
    {
        private readonly ProdutosController _produtosController;

        public ProdutoUT()
        {
            _produtosController = new ProdutosController();
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeTodos()
        {
            var resultado = _produtosController.getProdutos();

            Assert.IsFalse((resultado == null), "Não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeUm()
        {
            var resultado = _produtosController.getProduto(1);

            Assert.IsFalse((resultado == null), "Id:1 não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAdicionar()
        {
            Produto produto = new Produto();
            produto.name = "Teste";

            var resultado = _produtosController.addProduto(produto);

            Assert.IsFalse((resultado == null || resultado.id <= 0), "Deveria ter adicionado.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAlterar()
        {
            Produto produto = new Produto();
            produto.id = 1;
            produto.name = "Teste alterado";

            var resultado = _produtosController.updateProduto(produto);

            Assert.IsFalse((resultado == null || resultado < 0), "Deveria ter alterado o Id:1.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoExcluir()
        {
            var resultado = _produtosController.deleteProduto(1);

            Assert.IsFalse((resultado == null || resultado == 0), "Deveria ter excluído o Id:1.");
        }
    }
}

