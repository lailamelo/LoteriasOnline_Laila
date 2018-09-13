using Microsoft.VisualStudio.TestTools.UnitTesting;
using LoteriasOnline.Controllers;
using LoteriasOnline.Models;

namespace TesteUnitario
{
    [TestClass]
    public class RegraUT
    {
        private readonly RegrasController _regrasController;

        public RegraUT()
        {
            _regrasController = new RegrasController();
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeTodos()
        {
            var resultado = _regrasController.getRegras();

            Assert.IsFalse((resultado == null), "Não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeUm()
        {
            var resultado = _regrasController.getRegra(1);

            Assert.IsFalse((resultado == null), "Id:1 não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAdicionar()
        {
            Regra regra = new Regra();
            regra.name = "Teste";

            var resultado = _regrasController.addRegra(regra);

            Assert.IsFalse((resultado == null || resultado.id <= 0), "Deveria ter adicionado.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAlterar()
        {
            Regra regra = new Regra();
            regra.id = 1;
            regra.name = "Teste alterado";

            var resultado = _regrasController.updateRegra(regra);

            Assert.IsFalse((resultado == null || resultado < 0), "Deveria ter alterado o Id:1.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoExcluir()
        {
            var resultado = _regrasController.deleteRegra(1);

            Assert.IsFalse((resultado == null || resultado == 0), "Deveria ter excluído o Id:1.");
        }
    }
}

