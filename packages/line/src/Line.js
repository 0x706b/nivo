/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { area, line } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import {
    curveFromProp,
    getInheritedColorGenerator,
    withTheme,
    withColors,
    withDimensions,
    withMotion,
    Container,
    SvgWrapper,
    CartesianMarkers,
    Grid,
} from '@nivo/core'
import { Axes } from '@nivo/axes'
import { Brush, createBrushPointsFilter } from '@nivo/brush'
import { computeXYScalesForSeries, computeYSlices } from '@nivo/scales'
import { BoxLegendSvg } from '@nivo/legends'
import LineAreas from './LineAreas'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LinePoints from './LinePoints'
import { LinePropTypes, LineDefaultProps } from './props'

const brushFilter = createBrushPointsFilter(p => [
    p.position.x,
    p.position.y
])

class Line extends Component {
    static propTypes = LinePropTypes

    state = {
        selectedPoints: [],
    }

    handleBrushEnd = selection => {
        const { points } = this.props

        const pointsInSelection = brushFilter(selection, points)

        console.log(selection)
        console.log(pointsInSelection)
    }

    render() {
        const {
            computedData,
            points,
            lineGenerator,
            areaGenerator,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            axisTop,
            axisRight,
            axisBottom,
            axisLeft,
            enableGridX,
            enableGridY,
            gridXValues,
            gridYValues,

            lineWidth,
            enableArea,
            areaOpacity,
            areaBlendMode,

            enableDots,
            dotSymbol,
            dotSize,
            dotColor,
            dotBorderWidth,
            dotBorderColor,
            enableDotLabel,
            dotLabel,
            dotLabelFormat,
            dotLabelYOffset,

            markers,

            theme,

            animate,
            motionStiffness,
            motionDamping,

            isInteractive,
            tooltipFormat,
            tooltip,
            enableStackTooltip,

            legends,
        } = this.props

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                    >
                        <Grid
                            theme={theme}
                            width={width}
                            height={height}
                            xScale={enableGridX ? computedData.xScale : null}
                            yScale={enableGridY ? computedData.yScale : null}
                            xValues={gridXValues}
                            yValues={gridYValues}
                            {...motionProps}
                        />
                        <CartesianMarkers
                            markers={markers}
                            width={width}
                            height={height}
                            xScale={computedData.xScale}
                            yScale={computedData.yScale}
                            theme={theme}
                        />
                        <Axes
                            xScale={computedData.xScale}
                            yScale={computedData.yScale}
                            width={width}
                            height={height}
                            theme={theme}
                            top={axisTop}
                            right={axisRight}
                            bottom={axisBottom}
                            left={axisLeft}
                            {...motionProps}
                        />
                        {enableArea && (
                            <LineAreas
                                areaGenerator={areaGenerator}
                                areaOpacity={areaOpacity}
                                areaBlendMode={areaBlendMode}
                                lines={computedData.series}
                                {...motionProps}
                            />
                        )}
                        <LineLines
                            lines={computedData.series}
                            lineGenerator={lineGenerator}
                            lineWidth={lineWidth}
                            {...motionProps}
                        />
                        {isInteractive &&
                            enableStackTooltip && (
                                <LineSlices
                                    slices={computedData.slices}
                                    height={height}
                                    showTooltip={showTooltip}
                                    hideTooltip={hideTooltip}
                                    theme={theme}
                                    tooltipFormat={tooltipFormat}
                                    tooltip={tooltip}
                                />
                            )}
                        {enableDots && (
                            <LinePoints
                                points={points}
                                symbol={dotSymbol}
                                size={dotSize}
                                color={getInheritedColorGenerator(dotColor)}
                                borderWidth={dotBorderWidth}
                                borderColor={getInheritedColorGenerator(dotBorderColor)}
                                enableLabel={enableDotLabel}
                                label={dotLabel}
                                labelFormat={dotLabelFormat}
                                labelYOffset={dotLabelYOffset}
                                theme={theme}
                                {...motionProps}
                            />
                        )}
                        <Brush width={width} height={height} onBrushEnd={this.handleBrushEnd} />
                        {legends.map((legend, i) => {
                            const legendData = computedData.series
                                .map(line => ({
                                    id: line.id,
                                    label: line.id,
                                    color: line.color,
                                }))
                                .reverse()

                            return (
                                <BoxLegendSvg
                                    key={i}
                                    {...legend}
                                    containerWidth={width}
                                    containerHeight={height}
                                    data={legendData}
                                    theme={theme}
                                />
                            )
                        })}
                    </SvgWrapper>
                )}
            </Container>
        )
    }
}

const enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['curve'], ({ curve }) => ({
        lineGenerator: line()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    withPropsOnChange(
        ['data', 'xScale', 'yScale', 'width', 'height'],
        ({ data, xScale, yScale, width, height }) => ({
            computedData: computeXYScalesForSeries(data, xScale, yScale, width, height),
        })
    ),
    withPropsOnChange(['getColor', 'computedData'], ({ getColor, computedData: _computedData }) => {
        const seriesColors = _computedData.series.reduce((acc, serie) => ({
            ...acc,
            [serie.id]: getColor(serie),
        }), {})

        const computedData = {
            ..._computedData,
            series: _computedData.series.map(serie => ({
                ...serie,
                color: seriesColors[serie.id],
            })),
        }

        computedData.slices = computeYSlices(computedData)
        const points = computedData.series.reduce((acc, serie) => {
            return [
                ...acc,
                ...serie.data
                    .filter(d => d.position.x !== null && d.position.y !== null)
                    .map(d => ({
                        ...d,
                        id: `${serie.id}.${d.data.x}`,
                        color: serie.color,
                        serieId: serie.id,
                    })),
            ]
        }, [])

        return { seriesColors, computedData, points }
    }),
    withPropsOnChange(
        ['curve', 'computedData', 'areaBaselineValue'],
        ({ curve, computedData, areaBaselineValue }) => ({
            areaGenerator: area()
                .defined(d => d.x !== null && d.y !== null)
                .x(d => d.x)
                .y1(d => d.y)
                .curve(curveFromProp(curve))
                .y0(computedData.yScale(areaBaselineValue)),
        })
    ),
    pure
)

const enhancedLine = enhance(Line)
enhancedLine.displayName = 'Line'

export default enhancedLine
