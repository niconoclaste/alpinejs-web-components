import esbuild from 'esbuild';

// CDN
build({
  entryPoints: ['builds/cdn.js'],
  outfile: 'dist/cdn.js',
  bundle: true,
  minify: true,
  sourcemap: false,
  platform: 'browser',
  define: { CDN: true },
  target: "es2019",
})
build({
  entryPoints: ['builds/module.js'],
  outfile: 'dist/esm.js',
  bundle: true,
  minify: true,
  platform: 'neutral',
  mainFields: ['main', 'module'],
  target: "es2019",
})


// EXAMPLES
build({
  entryPoints: ['builds/cdn.js'],
  outfile: 'examples/dist/cdn.js',
  bundle: true,
  minify: false,
  sourcemap: false,
  platform: 'browser',
  define: { CDN: true },
  target: "es2019",
})
build({
  entryPoints: ['builds/module.js'],
  outfile: 'examples/dist/esm.js',
  bundle: true,
  minify: false,
  platform: 'neutral',
  mainFields: ['main', 'module'],
  target: "es2019",
})
build({
  entryPoints: ['builds/cdn.js'],
  outfile: 'examples/dist/cdn.min.js',
  bundle: true,
  minify: true,
  sourcemap: false,
  platform: 'browser',
  define: { CDN: true },
  target: "es2019",
})
build({
  entryPoints: ['builds/module.js'],
  outfile: 'examples/dist/esm.min.js',
  bundle: true,
  minify: true,
  platform: 'neutral',
  mainFields: ['main', 'module'],
  target: "es2019",
})


function build(options){
  options.define || (options.define = {});
  
  return esbuild.build({ ...options }).catch(() => process.exit(1));
}
