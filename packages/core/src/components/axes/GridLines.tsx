/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { GridLine } from './GridLine'
import { Theme } from '../../theming'

export interface GridLinesProps {
    type: 'x' | 'y'
    lines: Array<{
        key: string
        x1: number
        x2: number
        y1: number
        y2: number
    }>
    theme: Theme
    animate: boolean
    motionStiffness: number
    motionDamping: number
}

export class GridLines extends React.Component<GridLinesProps> {
    static propTypes = {
        type: PropTypes.oneOf(['x', 'y']).isRequired,
        lines: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                x1: PropTypes.number,
                x2: PropTypes.number,
                y1: PropTypes.number,
                y2: PropTypes.number,
            })
        ).isRequired,
        theme: PropTypes.object.isRequired,
        animate: PropTypes.bool.isRequired,
        motionStiffness: PropTypes.number.isRequired,
        motionDamping: PropTypes.number.isRequired,
    }

    willEnter = ({ style }) => {
        const { type } = this.props

        return {
            opacity: 0,
            x1: type === 'x' ? 0 : style.x1.val,
            x2: type === 'x' ? 0 : style.x2.val,
            y1: type === 'y' ? 0 : style.y1.val,
            y2: type === 'y' ? 0 : style.y2.val,
        }
    }

    willLeave = ({ style }) => {
        const { motionStiffness, motionDamping } = this.props
        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return {
            opacity: spring(0, springConfig),
            x1: spring(style.x1.val, springConfig),
            x2: spring(style.x2.val, springConfig),
            y1: spring(style.y1.val, springConfig),
            y2: spring(style.y2.val, springConfig),
        }
    }

    render() {
        const { lines, animate, motionStiffness, motionDamping, theme } = this.props

        if (!animate) {
            return (
                <g>
                    {lines.map(line => (
                        <GridLine key={line.key} {...line} {...theme.grid.line} />
                    ))}
                </g>
            )
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                styles={lines.map(line => {
                    return {
                        key: line.key,
                        style: {
                            opacity: spring(1, springConfig),
                            x1: spring(line.x1 || 0, springConfig),
                            x2: spring(line.x2 || 0, springConfig),
                            y1: spring(line.y1 || 0, springConfig),
                            y2: spring(line.y2 || 0, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <g>
                        {interpolatedStyles.map(interpolatedStyle => {
                            const { key, style } = interpolatedStyle

                            return <GridLine key={key} {...theme.grid.line} {...style} />
                        })}
                    </g>
                )}
            </TransitionMotion>
        )
    }
}
