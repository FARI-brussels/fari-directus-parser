import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  splitting: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'], 
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: env === 'development',
  target: 'esnext',
  outDir: 'dist',
  entry: ['src/**/*.ts', '!src/**/*.spec.ts'],
  sourcemap: true,
  tsconfig: 'tsconfig.json', // workaround for https://github.com/egoist/tsup/issues/571#issuecomment-1760052931
});