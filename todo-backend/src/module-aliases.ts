import ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@root': __dirname,
  '@data': __dirname.concat('/data'),
  '@controllers': __dirname.concat('/controllers'),
  '@entities': __dirname.concat('/entities'),
  '@models': __dirname.concat('/models'),
  '@routes': __dirname.concat('/routes'),
  '@services': __dirname.concat('/services'),
  '@tools': __dirname.concat('/tools')
});
