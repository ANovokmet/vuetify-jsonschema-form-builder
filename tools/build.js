const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const pkg = require('../package.json');
const postcss = require('rollup-plugin-postcss');

const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');

let promise = Promise.resolve();

// Clean up the output directory
const outputDir = './dist';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
} else {
    promise = promise.then(() => del([`${outputDir}/*`]));
}

promise = promise.then(() => rollup.rollup({
    input: './src/components/index.ts',
    external: ['vue'],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
            emitDeclarationOnly: true,
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,
                    declarationDir: `${outputDir}`,
                },
                include: [
                    'src/**/*.d.ts',
                    'src/components/*.ts',
                    'src/components/*.vue'
                ],
            }
        }),
        vue({ preprocessStyles: true }),
        postcss(),
        resolve(),
        commonjs(),
    ],
}));

promise.then(bundle => {
    bundle.write({
        format: 'esm',
        file: `${outputDir}/VuetifyJsonschemaFormBuilder.esm.js`,
        exports: 'named'
    });

    bundle.write({
        format: 'cjs',
        file: `${outputDir}/VuetifyJsonschemaFormBuilder.ssr.js`,
        exports: 'auto',
        globals: {
            'vue': 'Vue',
        }
    });

    bundle.write({
        format: 'iife',
        file: `${outputDir}/VuetifyJsonschemaFormBuilder.js`,
        name: 'VuetifyJsonschemaFormBuilder',
        compact: true,
        exports: 'auto',
        globals: {
            'vue': 'Vue',
        }
    });
});

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
    delete pkg.private;
    delete pkg.devDependencies;
    delete pkg.scripts;
    delete pkg.eslintConfig;

    fs.writeFileSync(`${outputDir}/package.json`, JSON.stringify(pkg, null, '  '), { encoding: 'utf-8', flag: 'w' });
    fs.writeFileSync(`${outputDir}/README.md`, fs.readFileSync('./README.md', 'utf-8'), { encoding: 'utf-8', flag: 'w' });
});

promise.catch(err => console.error(err.toString())); // eslint-disable-line no-console