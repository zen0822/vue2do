/**
 * omit 省略组件
 *
 * @prop line - 多行省略规定的行数
 * @prop type - 默认多行省略 multiple，可选单行省略 single
 *
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
    }

    isFa() {
        return this.props.type === 'fa'
    }

    render() {
        return (
            <div className={`${_xclass('')} ${this.props.className}`}>
                {this.props.type === 'multiple'
                    ? (
                        <div className={_xclass('multiple')}>
                            <div className={_xclass('container')}>
                                <div className={_xclass('content')}>
                                    {this.props.children}
                                </div>
                                <div className={_xclass('ghost')}>
                                    <div className={_xclass('placeholder')}></div>
                                    <div className={_xclass('more')}> ...</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={_xclass('single')}></div>
                    )
                }
            </div>
        )
    }
}

Omit.defaultProps = {
    className: '',
    type: 'multiple'
}

Omit.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string
}

export default Omit
