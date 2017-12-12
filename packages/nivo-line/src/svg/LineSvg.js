/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import {
    SmartMotion,
    motionPropTypes,
    defaultAnimate,
    defaultMotionDamping,
    defaultMotionStiffness,
} from '@nivo/core'

const Line = ({
    data,
    generator,
    xScale,
    yScale,
    size,
    animate,
    motionDamping,
    motionStiffness,
    ...props
}) => {
    const pathDef = generator(
        data.map(d => ({
            x: d.x !== null ? xScale(d.x) : null,
            y: d.y !== null ? yScale(d.y) : null,
        }))
    )

    if (animate !== true) {
        return <path d={pathDef} fill="none" strokeWidth={size} {...props} />
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <SmartMotion
            style={spring => ({
                d: spring(pathDef, springConfig),
            })}
        >
            {style => <path d={style.d} fill="none" strokeWidth={size} {...props} />}
        </SmartMotion>
    )
}

Line.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        })
    ),
    generator: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    // style
    size: PropTypes.number.isRequired,

    // motion
    ...motionPropTypes,
}

Line.defaultProps = {
    // style
    size: 2,

    // motion
    animate: defaultAnimate,
    motionDamping: defaultMotionDamping,
    motionStiffness: defaultMotionStiffness,
}

export default pure(Line)
