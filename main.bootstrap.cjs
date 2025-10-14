// Esse arquivo é CommonJS, só faz import() dinâmico do seu main ESM
import('./src/main/index.js')
  .then(() => console.log('Main ESM carregado'))
  .catch(err => console.error(err));
