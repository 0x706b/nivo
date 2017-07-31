/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stack from './Stack'
import Dimensions from 'react-dimensions'

class ResponsiveStack extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props

        return (
            <Stack
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        )
    }
}

export default Dimensions()(ResponsiveStack)
