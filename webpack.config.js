import path from 'path';

const mode = process.env.NODE_ENV?.match(/^prod/i) ? 'production' : 'development';

export default {
  mode,
  entry: {
    background: './src/background.ts',
    search: './src/search.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  devtool: mode === 'production' ? false : 'inline-source-map',
};
