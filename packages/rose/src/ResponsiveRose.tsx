/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import Rose from './Rose'
import { RoseProps } from './definitions'

export default class ResponsiveRose<Datum> extends React.Component<RoseProps<Datum>> {
    render() {
        return (
            <ResponsiveWrapper>
                {({ width, height }) => <Rose width={width} height={height} {...this.props} />}
            </ResponsiveWrapper>
        )
    }
}
