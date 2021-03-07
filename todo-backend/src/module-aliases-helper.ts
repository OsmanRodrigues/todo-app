import ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@root': __dirname,
  '@controllers': __dirname.concat('/controllers'),
  '@data': __dirname.concat('/data'),
  'env-helper': __dirname.concat('/env-helper'),
  '@entities': __dirname.concat('/entities'),
  '@models': __dirname.concat('/models'),
  '@routes': __dirname.concat('/routes'),
  '@services': __dirname.concat('/services'),
  '@tools': __dirname.concat('/tools')
});
