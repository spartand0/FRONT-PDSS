/* eslint-disable no-useless-constructor */
import client from 'socket.io-client';
import config from '../config';

const socketConnection = {
	_instance: null,
	get instance() {
		if (!this._instance) {
			this._instance = client(config.API_Config.BackEnd_ORIGIN, { forceNew: true, query: {} });
		}
		return this._instance;
	}
};
export default class SocketProvider {
	on(event, action, selector, session) {
		socketConnection.instance.on(event, data => {
			if (session) {
				const sessionData = data?.data?.otherDetails?.session?.session || data?.data?.otherDetails?.session;
				if (session.includes(sessionData)) {
					if (action && data) {
						return action(selector ? data[selector] : data);
					} else {
						return action();
					}
				} else {
					return null;
				}
			} else {
				return false;
			}
		});
	}
	emit(event, data) {
		socketConnection.instance.emit(event, JSON.stringify(data));
	}
	closeup(event) {
		socketConnection.instance.on(event).off();
	}
}
