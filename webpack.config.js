const path = require('path');//для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const HTMLWebpackPlugins = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),//точка входа в наше приложение содержит абсолютный путь к index.js
	output: {
		path: path.resolve(__dirname, 'dist'),//путь куда будет собираться наш проект
		filename: "main.js"// имя нашего бандла
	},
	devServer: {
		static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
		compress: true, // это ускорит загрузку в режиме разработки
		port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
		open: true, // сайт будет открываться сам при запуске npm run dev
		hot: true,
		//historyApiFallback: true
	},
	mode: "development",// по умолчанию webpack миницифирует скрипты, чтобы это избежать меням режим
	//Нужно помочь вебпаку научится работать с jsx  файлами для этого используют babel loader
	module: {
		rules: [// rules — это массив правил
			// добавим в него объект правил для бабеля
			{
				// регулярное выражение, которое ищет все js файлы
				test: /\.jsx?$/,
				// при обработке этих файлов нужно использовать babel-loader
				use: 'babel-loader',
				// исключает папку node_modules, файлы в ней обрабатывать не нужно
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']// здесь очень важна последовательность, webpack исполняет их справа налево
			},
			{
				// регулярное выражение, которое ищет все файлы с такими расширениями
				test: /\.(png|jpg|gif|woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource'
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'] //указываем файлы с которыми будет работать webpack
	},
	plugins: [
		new HTMLWebpackPlugins({
			template: path.resolve(__dirname, 'public/index.html')
		})
	],
	infrastructureLogging: {
		level: "warn"
	}
}
