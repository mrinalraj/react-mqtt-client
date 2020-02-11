import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import MQTT from 'mqtt'

export default class Connector extends Component {
	static propTypes = {
		mqttProps: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	}

	state = {}

	componentWillMount() {
		this._init()
	}

	_init = () => {
		const { mqtt, mqttProps } = this.props
		const typeofProp = typeof mqttProps === 'string' ? true : false
		this.mqtt = mqtt ? mqtt : typeofProp ? MQTT.connect(mqttProps) : MQTT.connect(mqttProps.url, mqttProps.options)

		this.mqtt.on('connect', this._makeStatusHandler('connected'))
		this.mqtt.on('reconnect', this._makeStatusHandler('reconnect'))
		this.mqtt.on('close', this._makeStatusHandler('closed'))
		this.mqtt.on('offline', this._makeStatusHandler('offline'))
		this.mqtt.on('error', console.error)
	}

	componentWillUnmount() {
		this.mqtt.end()
	}

	_makeStatusHandler = status => _ => this.setState({ mqttStatus: status })

	render() {
		const { children } = this.props
		return React.cloneElement(Children.only(children), { client: this.mqtt })
	}
}
