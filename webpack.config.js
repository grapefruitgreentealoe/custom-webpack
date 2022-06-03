const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// webpack 모듈 설정
module.exports = {
  devtool: "eval", //  : source-map을 설정하는 부분으로 에러가 발생했을 때 번들링된 파일에서 어느 부분에 에러가 났는지를 쉽게 확인할 수 있게 해주는 도구  "eval-cheap-source-map",
  entry: {
    bundle: ["./src/index.js"],
  }, // 입력
  resolve: {
    // 웹팩이 모듈을 처리하는 방식 정의하는 것으로 확장자를 생략하고도 인식하게 만든다.
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // babel-loader로 읽을 파일 확장자 정규표현식
        exclude: "/node_modules", // 제외할 파일 경로
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"], // babel-loader에서 사용할 옵션
        },
      },
      {
        test: /\.css$/, //css인 확장자 파일
        use: [
          "style-loader", //변환된 CSS 파일을 <style> 태그로 감싸서 삽입
          {
            loader: "css-loader", //css 파일을 컴포넌트에서 import/require 하여 사용할 수 있도록 해준다.
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      // CSS or SCSS
      {
        test: /\.(sc|c)ss$/, // scss나 css인 확장자 파일
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader", // Sass/SCSS 파일들을 css 파일로 컴파일해준다.
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.jfif$/,
        loader: "file-loader", //이미지 및 폰트 등의 파일 로딩
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"), // __dirname: 현재 실행 중인 폴더 경로
    filename: "[name].js",
  }, // 출력
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    allowedHosts: "auto",
    open: true, // dev-server로 실행시 브라우저로 바로 열리도록 하는 설정
    hot: true, //Enable webpack's Hot Module Replacement feature:\
    historyApiFallback: true, //react-router-dom html5 refresh bug fix
  },
};
