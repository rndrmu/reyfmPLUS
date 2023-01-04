const { config } = require('@swc/core/spack')


module.exports = config({
    entry: {
        'web': __dirname + '/dist/index.js',
    },
    output: {
        path: __dirname + '/out'
    },
    module: {},
});