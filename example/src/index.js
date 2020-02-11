import React from 'react'
import ReactDOM from 'react-dom'
import { Connector, subscribe } from 'react-mqtt-client'

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Connector
					mqttProps={{
						url: 'ws://https://test.mosquitto.org:8080',
						options: { protocol: 'ws' },
					}}
				>
					<Connected />
				</Connector>
			</React.Fragment>
		)
	}
}

const MessageList = props => {
	const { mqtt } = props
	return (
		<React.Fragment>
			{props.data.reverse().map((d, i) => (
				<p>{`${JSON.stringify(d, null, 4)}`}</p>
			))}
			<button onClick={() => mqtt.publish('testing-topic', 'test message')}>send a message</button>
		</React.Fragment>
	)
}

const Connected = subscribe({ topic: '#' })(MessageList)

ReactDOM.render(<App />, document.getElementById('root'))
