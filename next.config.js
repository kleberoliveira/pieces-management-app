const withImages = require('next-images')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
const path = require('path')

module.exports = {
    env: {
        API_HOST: process.env.API_HOST,
        APPLICATION_SECRET: process.env.APPLICATION_SECRET,
    },
    ...withFonts(
        withCSS(
            withImages(
                withSass({
                    webpack(config, options) {
                        config.module.rules.push({
                            test: /\.(eot|ttf|woff|woff2)$/,
                            use: {
                                loader: 'url-loader',
                            },
                        })
                        config.resolve.modules.push(path.resolve('./'))
                        return config
                    },
                })
            )
        )
    ),
}
