using Microsoft.VisualStudio.TestTools.UnitTesting;
using LoteriasOnline.Controllers;
using LoteriasOnline.Models;

namespace TesteUnitario
{
    [TestClass]
    public class JogoUT
    {
        private readonly JogosController _jogosController;

        public JogoUT()
        {
            _jogosController = new JogosController();
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeTodos()
        {
            var resultado = _jogosController.getJogos();

            Assert.IsFalse((resultado == null), "Não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNuloDeUm()
        {
            var resultado = _jogosController.getJogo(1);

            Assert.IsFalse((resultado == null), "Id:1 não deveria ser nulo.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoAdicionar()
        {
            Jogo jogo = new Jogo();
            jogo.name = "Teste";

            var resultado = _jogosController.addJogo(jogo);

            Assert.IsFalse((resultado == null || resultado.id <= 0), "Deveria ter adicionado.");
        }
        
        [TestMethod]
        public void RetornaFalsoSeNaoExcluir()
        {
            var resultado = _jogosController.deleteJogo(1);

            Assert.IsFalse((resultado == null || resultado == 0), "Deveria ter excluído o Id:1.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoGerarSurpresinha()
        {
            var resultado = _jogosController.surpresinha(1);

            Assert.IsFalse((resultado == null), "Deveria ter gerado a Surpresinha do Produto Id:1.");
        }

        [TestMethod]
        public void RetornaFalsoSeNaoExecutarResultado()
        {
            var resultado = _jogosController.resultado(1);

            Assert.IsFalse((resultado == null), "Deveria ter executado o resultado do Produto Id:1.");
        }
    }
}

