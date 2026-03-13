import { useState } from "react";
import { Modal, useModal } from "./Modal.jsx";
import Spacer from "./Spacer.jsx";
import Action from "./Actions.jsx";
import "./scss/Alert.scss";

export const Alert = ({ message, onDismiss }) => {
	return (
		<Modal title="Alert" headerColor="DodgerBlue">
			<Spacer>
				<p className="alertMessage">{message}</p>
				<Action.Tray>
					<Action.Dismiss showText onClick={onDismiss} />
				</Action.Tray>
			</Spacer>
		</Modal>
	);
};

export const Confirm = ({ message, onConfirm, onDismiss }) => {
	//handler
	const handleConfirm = () => {
		onConfirm();
		onDismiss();
	};
	return (
		<Modal title="Confirm" headerColor="Orange">
			<Spacer>
				<p className="alertMessage">{message}</p>
				<Action.Tray>
					<Action.Yes showText onClick={handleConfirm} />
					<Action.Dismiss showText onClick={onDismiss} />
				</Action.Tray>
			</Spacer>
		</Modal>
	);
};

export const Error = ({ message, onDismiss }) => {
	return (
		<Modal title="Error" headerColor="Red">
			<Spacer>
				<p className="alertMessage">{message}</p>
				<Action.Tray>
					<Action.Dismiss showText onClick={onDismiss} />
				</Action.Tray>
			</Spacer>
		</Modal>
	);
};

export const useAlert = () => {
	//state
	const [isOpen, openModal, close] = useModal(false);
	const [message, setMessage] = useState(null);

	//handlers
	const open = (message) => {
		setMessage(message);
		openModal();
	};

	return [isOpen, message, open, close];
};
