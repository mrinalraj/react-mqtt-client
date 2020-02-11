# react-mqtt-client

> React Container for mqttjs/MQTT.js

[![NPM](https://img.shields.io/npm/v/react-mqtt-client.svg)](https://www.npmjs.com/package/react-mqtt-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

using npm:

```bash
npm install --save react-mqtt-client
```

using yarn:

```bash
yarn add react-mqtt-client
```

## Usage

Currently, mqtt-react exports two enhancers. Similarly to react-redux, you'll have to first wrap a root component with a Connector which will initialize the mqtt instance and then subscribe to data by using subscribe.

#### Root component

```jsx
import React from 'react'
import { Connector } from 'react-mqtt-client'

export const App = () => (
	<Connector
		mqttProps={{
			url: 'ws://https://test.mosquitto.org:8080',
			options: { protocol: 'ws' }, // see MQTTjs options
		}}
	>
		<Connected />
	</Connector>
)
```

#### subscribed component

```jsx
import { subscribe } from 'react-mqtt-client'

const MessageList = props => {
	const { mqtt } = props
	return (
		<React.Fragment>
			{props.data.reverse().map((d, i) => (
				<p>{`${JSON.stringify(d, null, 4)}`}</p>
			))}
		</React.Fragment>
	)
}

const Connected = subscribe({ topic: '#' })(MessageList)
```

In addition to `topic` you can add `saveData` prop to let the custom dispatcher know if data from the broker needs to be saved.
defaults to true.

#### publish message to topic

```jsx
import React from 'react'
import { subscribe } from 'mqtt-react'

const sendMessage = props => () => props.mqtt.publish('@demo/topic', 'Hello World')
const SendMessageButton = props => <button onClick={sendMessage(props)}>Send Message</button>
export default subscribe({ topic: '@demo/topic' })(SendMessageButton)
```

#### Advanced Susbcription / Integration with Redux:

It is possible to provide a function that handles received messages. By default the function adds the message to the data prop, but it can be used to dispatch actions to a redux store.

```jsx
import { subscribe } from 'mqtt-react'
import store from './store'

const customDispatch = function(topic, message, packet) {
	store.dispatch(topic, message)
}

export default subscribe({
	topic: '@demo/test',
	dispatch: customDispatch,
})
```

### Contributing

Pull Requests are very welcome!

## License

MIT © [mrinalraj](https://github.com/mrinalraj)
