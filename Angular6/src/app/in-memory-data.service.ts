import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const apostadores = [
      { id: 1, name: 'Daniel' },
      { id: 2, name: 'Marcos' },
      { id: 3, name: 'Marcela' },
      { id: 4, name: 'Joaquim' },
      { id: 5, name: 'Fernanda' }
    ];

    const regras = [
      { id: 1, name: 'Sena', qtd_vencer: 6 },
      { id: 2, name: 'Quina', qtd_vencer: 5 },
      { id: 3, name: 'Quadra', qtd_vencer: 4 }
    ];

    const REGRAS_MEGASENA = [
      regras[0],
      regras[1],
      regras[2]
    ];

    // const REGRAS_QUINA = [
    //   regras[1],
    //   regras[2]
    // ];

    const produtos = [
      { id: 1, name: 'mega-sena', qtd_max: 60, lista_regras: REGRAS_MEGASENA }
      //{ id: 2, name: 'quina', qtd_max: 5, lista_regras: REGRAS_QUINA }
      // { id: 1, name: 'mega-sena' },
      // { id: 2, name: 'lotofácil' },
      // { id: 3, name: 'quina' },
      // { id: 4, name: 'lotomania' },
      // { id: 5, name: 'timemania' },
      // { id: 6, name: 'dupla sena' },
      // { id: 7, name: 'loteca' },
      // { id: 8, name: 'lotogol' },
      // { id: 9, name: 'dia de sorte' }
    ];

    const jogos = [
      { id: 1, apostador: apostadores[0], produto: produtos[0], lista_numeros: [2, 14, 15, 25, 33, 54], dthr: '11/09/2018 14:41', name: '2 14 15 25 33 54' },
      { id: 2, apostador: apostadores[1], produto: produtos[0], lista_numeros: [3, 15, 17, 28, 38, 50], dthr: '11/09/2018 15:30', name: '3 15 17 28 38 50' }
    ];

    return { heroes, apostadores, jogos, produtos, regras };
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/