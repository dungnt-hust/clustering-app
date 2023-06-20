import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import cjs from '@rollup/plugin-commonjs';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      allow: ['../'],
    },
  },
  css: {
    devSourcemap: true,
  },

  // envDir: "./env_web",
  build: {
    // minify: false,
    // target: "es2015",
    outDir: 'dist_web',
    sourcemap: true,
    commonjsOptions: { include: [] },
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        nodePolyfills({
          include: ['node_modules/**/*.js', '../../node_modules/**/*.js'],
        }),
        cjs(),
      ],
    },
  },

  // ...other config settings
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ]
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },

})
