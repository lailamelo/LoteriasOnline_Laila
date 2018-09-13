using Microsoft.VisualStudio.TestTools.UnitTesting;
using LoteriasOnline.Controllers;
using LoteriasOnline.Models;

namespace TesteUnitario
{
    [TestClass]
    public class ApostadorUT
    {
        private readonly ApostadoresController _apostadoresController;

        public ApostadorUT()
        {
            _apostadoresController = new ApostadoresController();
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeTodos()
        {
            var resultado = _apostadoresController.getApostadores();

            Assert.IsFalse((resultado == null), "Não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeUm()
        {
            var resultado = _apostadoresController.getApostador(1);

            Assert.IsFalse((resultado == null), "Id:1 não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAdicionar()
        {
            Apostador apostador = new Apostador();
            apostador.name = "Teste";

            var resultado = _apostadoresController.addApostador(apostador);

            Assert.IsFalse((resultado == null || resultado.id <= 0), "Deveria ter adicionado.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAlterar()
        {
            Apostador apostador = new Apostador();
            apostador.id = 1;
            apostador.name = "Teste alterado";

            var resultado = _apostadoresController.updateApostador(apostador);

            Assert.IsFalse((resultado == null || resultado < 0), "Deveria ter alterado o Id:1.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoExcluir()
        {
            var resultado = _apostadoresController.deleteApostador(1);

            Assert.IsFalse((resultado == null || resultado == 0), "Deveria ter excluído o Id:1.");
        }
    }
}

