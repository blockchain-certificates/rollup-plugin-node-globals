const { rollup } = require('rollup');
const nodeGlobals = require('../');

test.each([
  ['process'],
  ['buffer'],
  ['dirname'],
  ['filename'],
  ['global']
])('conditionally polyfills %s', async name => {
  const options = {
    baseDir: process.cwd(),
    process: false,
    buffer: false,
    dirname: false,
    filename: false,
    global: false,
    [name]: true
  };
  const bundle = await rollup({
    input: 'test/fixtures/mixed.js',
    plugins: [nodeGlobals(options)]
  })
  const result = await bundle.generate({ format: 'esm' });
  const { code } = result.output[0];
  expect(code).toMatchSnapshot();
})

