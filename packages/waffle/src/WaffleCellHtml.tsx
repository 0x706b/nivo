/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

export interface WaffleCellHtmlProps {
    position: number
    size: number
    x: number
    y: number
    color: string
    opacity: number
    borderWidth: number
    borderColor: string
    // data: PropTypes.object.isRequired,
    // onHover: PropTypes.func.isRequired,
    // onLeave: PropTypes.func.isRequired,
    // onClick: PropTypes.func.isRequired,
}

export const WaffleCellHtml = ({
    // position,
    size,
    x,
    y,
    color,
    opacity,
    borderWidth,
    borderColor,
    // data,
    // onHover,
    // onLeave,
    // onClick,
}: WaffleCellHtmlProps) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: size,
                height: size,
                background: color,
                opacity,
                boxSizing: 'content-box',
                borderStyle: 'solid',
                borderWidth: `${borderWidth}px`,
                borderColor,
            }}
            /*
            onMouseEnter={onHover}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            onClick={event => {
                onClick({ position, color, x, y, data }, event)
            }}
            */
        />
    )
}
