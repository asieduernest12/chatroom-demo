type User = { id: string; username: string };

type Message = {
	message: string;
	destination_room_id: string;
	host_username: string;
	guest_username?: string;
};

type Room = {
	id: string;
	label?: string;
	parties?: User[];
};

type MessengerState = {
	guest: User;
	host: User;
	room_id: string;
	messages: Message[];
	[key: string]: any;
	rooms: Room[];
};

type updateStore = (key: string, value: any) => void;

type removeFromStore = (key: string) => void;

type setHost = (user: User) => void;

type setGuest = (user: User) => void;

type sendMessage = (message: Message) => void;

type MessengerContextValue = {
	contextState: MessengerState;
	updateStore: updateStore;
	removeFromStore: removeFromStore;
	setHost: setHost;
	setGuest: setGuest;
	sendMessage: sendMessage;
};
