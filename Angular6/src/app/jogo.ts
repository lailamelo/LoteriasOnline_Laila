import { Apostador } from './apostador';
import { Produto } from './produto';

export class Jogo {
  id: number;
  apostador: Apostador;
  produto: Produto;
  lista_numeros: number[];
  dthr: string;
  name: string;
}