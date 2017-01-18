import React from 'react'
import Helmet from "react-helmet"

import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from './utils/typography'
import styleSheet from 'styled-components/lib/models/StyleSheet'



const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
  propTypes () {
    return {
      body: React.PropTypes.string,
    }
  },
  render () {
    const head = Helmet.rewind()

    let css
    let styles
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
      styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="apple-touch-icon" sizes="180x180" href={require('assets/apple-touch-icon.png')}/>
          <link rel="icon" type="image/png" href={require('assets/favicon-32x32.png')} sizes="32x32"/>
          <link rel="icon" type="image/png" href={require('assets/favicon-16x16.png')} sizes="16x16"/>
          <link rel="manifest" href={require('assets/manifest.json')}/>
          <link rel="mask-icon" href={require('assets/safari-pinned-tab.svg')} color="#5bbad5"/>
          <meta name="theme-color" content="#ffffff"/>

          {head.title.toComponent()}
          {head.meta.toComponent()}
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          {css}
          <style>
            {styles}
          </style>
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        </body>
      </html>
    )
  },
})
