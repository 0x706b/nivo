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

const HeatMapCellCircle = ({
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    textColor,
}) => {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <circle
                r={Math.min(width, height) / 2}
                fill={color}
                fillOpacity={opacity}
                strokeWidth={borderWidth}
                stroke={borderColor}
            />
            <text alignmentBaseline="central" textAnchor="middle" style={{ fill: textColor }}>
                {value}
            </text>
        </g>
    )
}

HeatMapCellCircle.propTypes = {
    value: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
}

export default pure(HeatMapCellCircle)
