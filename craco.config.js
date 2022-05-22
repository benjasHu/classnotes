const CracoAlias = require('craco-alias')
const sassResourcesLoader = require('craco-sass-resources-loader')

module.exports = {
	webpack: {},
	style: {
		sass: {
			loaderOptions: {
				implementation: require('sass')
			}
		}
	},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'options',
				baseUrl: './',
				debug: false,
				aliases: {
					'@src': './src',
					'@yup': './src/yup.js',
					'@board': './src/board',
					'@constants': './src/constants',
					'@styles': './src/styles',
					'@hooks': './src/hooks',
					'@context': './src/context',
					'@components': './src/components',
					'@store': './src/store',
					'@svgs': './src/static/svg',
					'@images': './src/static/images'
				}
			}
		},
		{
			plugin: sassResourcesLoader,
			options: {
				resources: './src/styles/main.scss'
			}
		}
	]
}
