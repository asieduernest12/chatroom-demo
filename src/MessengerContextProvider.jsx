import React, { createContext, useState } from "react";

export const MessengerContext = createContext();

export function MessengerContextProvider({ children }) {
	const [state, setState] = useState({});

	/** @global */
	const updateStore = (key, value) => {
		setState((oldState) => ({ ...oldState, [key]: value }));
	};

	// const filter = (/** @type {string} */ testKey) => (/** @type {string} */ key) => new RegExp(testKey, "i").test(key);

	/** @global */
	const removeFromStore = (/** @type {string} */ key) => {
		setState((oldState) => {
			const oldMap = new Map(Object.entries(oldState));
			oldMap.delete(key);
			const newState = Object.fromEntries([...oldMap]);
			return newState;
		});
	};

	/** @global */
	const setSender = (newSender) => updateStore("sender", newSender);

	/** @global */
	const setReceiver = (newReceiver) => updateStore("receiver", newReceiver);

	/** 
	 * @global
	 * @alias MessengerStoreInterface
	 */
	const store = { state, updateStore, setReceiver, setSender, removeFromStore };

	return <MessengerContext.Provider value={store}>{children}</MessengerContext.Provider>;
}
