/**
 * omit 省略组件
 *
 * @prop line - 多行省略规定的行数，默认是 1 行
 */

import './Omit.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { render } from 'react-dom'
import compConf from '../../config.json'
import { xclass } from '../../util/comp'

const compPrefix = 'omit'

const _xclass = (className) => {
  return xclass(compPrefix, className)
}

class Omit extends Component {
  constructor(props) {
    super(props)

    this.compName = compPrefix // 组件名字
    this.boxWidth = 0 // 文字宽度
    this.fontWidthHub = {}

    this.state = {
      line: []
    }
  }

  textWidth(text, fontSize) {
    if (text === ' ') {
      return 4
    }

    if (this.fontWidthHub[text] !== undefined) {
      return this.fontWidthHub[text]
    }

    const span = this.refs.font
    let width = 0

    if (typeof span.textContent !== 'undefined') {
      span.textContent = text
    } else {
      span.innerText = text
    }

    width = span.offsetWidth

    if (this.isDoubleByte(text)) {
      this.fontWidthHub = {
        ...this.fontWidthHub,
        doubleByte: width
      }
    } else {
      this.fontWidthHub = {
        ...this.fontWidthHub,
        [text]: width
      }
    }

    return width
  }

  // 匹配汉字
  isDoubleByte(text) {
    const regex = /[^\u4e00-\u9fa5]/

    if (regex.test(text)) {
      return true
    }

    return false
  }

  splite() {
    const contentArray = this.props.children.split('')
    const contentArrayLength = contentArray.length

    let index = 0
    let fontLength = Math.floor(this.boxWidth / this.textWidth)
    let lineFont = []

    for (let i = 0, lineLength = this.props.line; i < lineLength; i++) {
      if (contentArray[index] === undefined) {
        break
      }

      let lineWidth = 0 // 这一行的宽度
      let j = index
      let char = ''
      let singleChar = 0

      for (; j < contentArrayLength; j++) {
        let fontWidth = this.textWidth(contentArray[j])

        if (contentArray[j] === undefined || (fontWidth + lineWidth) >= this.boxWidth) {
          break
        }

        lineWidth = lineWidth + fontWidth
        char = char + contentArray[j]
      }

      lineFont.push(i === lineLength - 1 ? (char + char) : char)
      index = j
    }

    this.setState({
      line: lineFont
    })
  }

  componentDidMount() {
    this.boxWidth = this.refs.me.offsetWidth - 1
    this.splite()
  }

  render() {
    const lineLength = this.state.line.length

    return (
      <div ref='me' className={`${_xclass('')} ${this.props.className}`}>
        <span className={_xclass('font-width')} ref='font'></span>
        {this.state.line.map((item, index) => {
          return item !== undefined && item !== ''
            ? (
              <div
                className={`
                    ${index + 1 === lineLength ? _xclass('line-last') : ''}
                    ${_xclass('line')}
                `}
                key={index.toString()}
              >
                {item}
              </div>
            ) : null
        })}
      </div>
    )
  }
}

Omit.defaultProps = {
  className: '',
  line: 1
}

Omit.propTypes = {
  className: PropTypes.string,
  line: PropTypes.number
}

export default Omit
