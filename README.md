# REACT 배워서 HUMAN되기

# TOC

- SETTING
- React Router Dom 및 Context 구성하고 Hello World!
- Emotion을 사용해서 Atomic Design 구성 및 StoryBook 세팅
- MD문서(로컹저장)의 초간단 블로그 개발

# SETTING

## React

- 새 프로젝트 폴더 생성 후 VS Code로 Open
- 아래 명령어 실행

  ```shell
  npm init -y && yarn init -y
  ```

  ```shell
  yarn add react react-dom
  ```

## TypeScript

- 아래 명령어 실행

  ```shell
  yarn add -D typescript @types/react @types/react-dom
  ```

  ```shell
  ./node_modules/.bin/tsc --init
  ```

- `tsconfig.json`의 내용을 아래로 치환

  ```json
  {
  	"compilerOptions": {
  		"sourceMap": true,
  		"target": "es5",
  		"lib": ["dom", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020"],
  		"allowJs": true,
  		"strict": true,
  		"forceConsistentCasingInFileNames": true,
  		"esModuleInterop": true,
  		"module": "commonjs",
  		"isolatedModules": true,
  		"jsx": "preserve",
  		"allowSyntheticDefaultImports": true,
  		"baseUrl": "./",
  		"outDir": "./dist",
  		"moduleResolution": "node"
  	},
  	"exclude": ["node_modules"],
  	"include": ["**/*.ts", "**/*.tsx"]
  }
  ```

## Babel

- 아래 명령어 실행

  ```shell
  yarn add -D babel-loader @babel/core @babel/preset-env
  ```

  ```shell
  yarn add -D @babel/preset-react @babel/preset-typescript
  ```

- 프로젝트 루트 경로에 `babel.config.js` 생성 후 아래 내용 기입

  ```js
  module.exports = {
  	presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
  };
  ```

## Webpack

- 아래 명령어 실행

  ```shell
  yarn add -D webpack webpack-cli webpack-dev-server
  ```

  ```shell
  yarn add -D html-webpack-plugin ts-loader
  ```

- 프로젝트 루트 경로에 `webpack.config.js` 생성 후 아래 내용 기입

  ```js
  const webpack = require('webpack');
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  const prod = process.env.NODE_ENV === 'production';

  module.exports = {
  	mode: prod ? 'production' : 'development',
  	devtool: prod ? 'hidden-source-map' : 'source-map',

  	entry: './index.tsx',

  	resolve: {
  		extensions: ['.js', '.jsx', '.ts', '.tsx'],
  	},

  	module: {
  		rules: [
  			{
  				test: /\.tsx?$/,
  				use: ['babel-loader', 'ts-loader'],
  			},
  		],
  	},

  	output: {
  		path: path.join(__dirname, '/dist'),
  		filename: '[name].[contenthash].js',
  	},

  	devServer: {
  		historyApiFallback: true,
  		// inline: true,
  		port: 3000,
  		hot: true,
  		// publicPath: '/',
  	},

  	plugins: [
  		new webpack.ProvidePlugin({
  			React: 'react',
  		}),
  		new HtmlWebpackPlugin({
  			template: './index.html',
  		}),
  		new webpack.HotModuleReplacementPlugin(),
  	],
  };
  ```

- `package.json`에 아래 내용 추가

  ```json
  "scripts": {
    "dev": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production",
    "prestart": "npm build",
    "start": "webpack --mode development"
  }
  ```

## Hello World

### 프로젝트 루트 폴더 내 아래 파일들을 생성

- `index.tsx`

  ```ts
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  const rootElement = document.getElementById('root');

  ReactDOM.render(<App />, rootElement);
  ```

- `App.tsx`

  ```ts
  import React from 'react';

  export default function App() {
  	return <div>Hello World</div>;
  }
  ```

- `index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
  		<meta name="viewport" content="width=, initial-scale=1.0" />
  		<title>Document</title>
  	</head>
  	<body>
  		<div id="root"></div>
  	</body>
  </html>
  ```

- 아래 명령어 실행

```
yarn run dev
```

> Hello World 출력 시 성공
>
> Webpack 버전에 따라 webpack-cli에 기본적으로 Hot Module이 포함되어
>
> new webpack.HotModuleReplacementPlugin(),
>
> 생략 후 아래 명령어로 실행 가능
>
> ```shell
> yarn webpack serve
> ```

## Eslint

- EXTENSIONS: MARKETPLACE 에서 아래 플러그인 설치
  - ESLint
  - Prettier - Code formatter
- 아래 명령어 실행

  ```shell
  yarn add -D eslint
  ```

  ```shell
  yarn eslint --init
  ```

- `.eslintrc.json` 아래 내용으로 수정

  ```json
  {
  	"env": {
  		"browser": true,
  		"es2021": true
  	},
  	"extends": [
  		"eslint:recommended",
  		"plugin:react/recommended",
  		"plugin:@typescript-eslint/recommended",
  		"plugin:@typescript-eslint/recommended-requiring-type-checking"
  	],
  	"parser": "@typescript-eslint/parser",
  	"parserOptions": {
  		"project": "./tsconfig.json",
  		"ecmaFeatures": {
  			"jsx": true
  		},
  		"ecmaVersion": "latest",
  		"sourceType": "module"
  	},
  	"ignorePatterns": ["dist/", "node_modules/"],
  	"plugins": ["react", "@typescript-eslint"],
  	"rules": {}
  }
  ```

## Prettier

- 아래 명령어 실행

  ```shell
  yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
  ```

  - eslint-config-prettier: Prettier와 충돌되는 Eslint 규칙 무시
  - eslint-plugin-prettier: Prettier를 사용해 포맷팅을 하도록 Eslint 규칙 추가

- `.eslintrc.json`의 extends배열에 아래 내용 추가

  ```
  "plugin:prettier/recommended",
  /* eslint-plugin-prettier + eslint-config-prettier 동시 적용 */
  "prettier/@typescript-eslint"
  /* prettier 규칙과 충돌하는 @typescript-eslint/eslint-plugin 규칙 비활성화 */
  ```

- `.prettierrc.json` 생성 후 아래 내용 기입

  ```json
  {
  	"printWidth": 120,
  	"tabWidth": 2,
  	"trailingComma": "all",
  	"singleQuote": true,
  	"bracketSpacing": true,
  	"semi": true,
  	"useTabs": true,
  	"arrowParens": "avoid",
  	"endOfLine": "lf"
  }
  ```

- VSCode Format On Save 설정
  - Preferences > Settings > Workspace > Editor: Format On Save 옵션에 체크
  - cmd + p > Format Document With... > Prettier - Code formatter
