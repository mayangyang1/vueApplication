const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtoviewport({
                        viewportWidth: 375,
                        // 该项仅在使用 Circle 组件时需要
                        // 原因参见 https://github.com/youzan/vant/issues/1948
                        selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        }
    },
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}