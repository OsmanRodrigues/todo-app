import ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@root': __dirname,
  '@helpers': __dirname.concat('/helpers'),
  '@data': __dirname.concat('/data'),
  '@endpoints': __dirname.concat('/endpoints'),
  '@entities': __dirname.concat('/entities'),
  '@routes': __dirname.concat('/routes'),
  '@services': __dirname.concat('/services')
});
