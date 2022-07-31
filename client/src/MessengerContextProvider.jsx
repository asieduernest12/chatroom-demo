import React, { createContext, useMemo, useState } from 'react';
import reactProptypes from 'react-proptypes';

export const MessengerContext = /** @type {MessengerContextValue & import("react").Context}  */ (createContext({}));

export function MessengerContextProvider({ children }) {
	const [state, setState] = useState(/** @type {MessengerState} */ ({}));

	const updateStore = (/** @type {string} */ key, /** @type {{}} */ value) => {
		setState((oldState) => {
			const newState = { ...oldState, [key]: value };
			console.log({ oldState, newState });
			return /** @type {MessengerState} */ (newState);
		});
	};

	// const filter = (/** @type {string} */ testKey) =>
	//   (/** @type {string} */ key) => new RegExp(testKey, "i").test(key);

	const removeFromStore = (/** @type {string} */ key) => {
		setState((/** @type {any} */ oldState) => {
			const oldMap = new Map(Object.entries(oldState));
			oldMap.delete(key);
			const newState = Object.fromEntries([...oldMap]);
			return /** @type {MessengerState} */ (newState);
		});
	};

	const setHost = (/** @type {User} */ newSender) => updateStore('host', newSender);

	const setGuest = (/** @type {User} */ newReceiver) => updateStore('guest', newReceiver);

	const sendMessage = (/** @type {Message} */ newMessage) => updateStore('messages', [...(state?.messages ?? []), newMessage]);

	const store = useMemo(
		() => ({
			contextState: state,
			updateStore,
			setGuest,
			setHost,
			removeFromStore,
			sendMessage,
		}),
		[state]
	);
	// const store =

	return <MessengerContext.Provider value={store}>{children}</MessengerContext.Provider>;
}

MessengerContextProvider.propTypes = {
	children: reactProptypes.node.isRequired,
};
