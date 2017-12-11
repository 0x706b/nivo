import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { computeLinearScaleX } from './computeScales'

export default class LinearScaleX extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        scales: PropTypes.object, // private, from <Scales>
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        width: PropTypes.number.isRequired,
    }

    static defaultProps = {
        min: 'auto',
        max: 'auto',
    }

    static compute = computeLinearScaleX

    render() {
        return null
    }
}
