/* eslint-disable @typescript-eslint/no-var-requires */
const sveltePreprocess = require('svelte-preprocess');
const path = require('path');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();

module.exports = {

    resolve: {
        // see below for an explanation
        alias: {
            svelte: path.resolve('node_modules', 'svelte/src/runtime') // Svelte 3: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte', 'ts'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte', 'browser']
    },
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: sveltePreprocess()
                    }
                }
            },
            {
                // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    }
}
