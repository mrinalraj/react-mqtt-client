import { Component, createElement } from 'react'
import PropTypes from 'prop-types'

export default (topic, dispatch, TargetComponent) =>
	class extends Component {
		static propTypes = {
			client: PropTypes.object,
		}
		static contextTypes = {
			mqtt: PropTypes.object,
		}

		constructor(props, context) {
			super(props, context)

			this.client = props.client || context.mqtt
			this.state = {
				subscribed: false,
				data: [],
			}
			this.handler = dispatch.bind(this)
			this.client.on('message', this.handler)
		}

		componentWillMount() {
			this.subscribe()
		}

		componentWillUnmount() {
			this.unsubscribe()
		}

		render() {
			const { client, ...props } = this.props
			return createElement(TargetComponent, {
				...props,
				data: this.state.data,
				mqtt: this.client,
			})
		}

		subscribe() {
			this.client.subscribe(topic)
			this.setState({ subscribed: true })
		}

		unsubscribe() {
			this.client.unsubscribe(topic)
			this.setState({ subscribed: false })
		}
	}
