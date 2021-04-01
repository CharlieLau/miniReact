import resolve  from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'



export default {
    input:'src/index.js',
    output:[
        {file:'dist/index.js',format:'umd',soucemap:true}
    ],
    plugins:[
        babel({
            exclude: 'node_modules/**'
          }),
        resolve({ mainFields: ['module', 'main', 'browser'] }),
        serve(['dist','public']),
        livereload()
    ],
    onwarn(warning,rollupWarn) {
        const ignoredCircular=[
            'src/react-dom/patch/index.js',
            'src/react-dom/render.js',
            'src/react/component.js'
        ]
        if(warning.code === 'CIRCULAR_DEPENDENCY' &&  ignoredCircular.some((d => warning.importer.includes(d)))){
            return;
        }
        rollupWarn(warning)
    }
}