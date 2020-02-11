import MQTTSubscriber from './MQTTSubscriber'

const parse = message => {
	try {
		return JSON.parse(message)
	} catch (e) {
		return message.toString()
	}
}

function defaultDispatch(storeData = true) {
	return function(topic, message, packet) {
		const { state } = this
		const m = parse(message)
		const newData = storeData ? [m, ...state.data] : [m]
		this.setState({ data: newData })
	}
}

export default opts => TargetComponent => {
	const { topic, dispatch, storeData = true } = opts
	const dispatcher = dispatch ? dispatch : defaultDispatch(storeData)

	return MQTTSubscriber(topic, dispatcher, TargetComponent)
}
