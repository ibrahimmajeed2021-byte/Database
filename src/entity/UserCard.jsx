import { Card } from "../../UI/Card.jsx";
import "./UserCard.scss";

const UserCard = ({ user }) => {
	return (
		<div className="userCard">
			<Card>
				<p>{`${user.UserFirstname} ${user.UserLastname}`}</p>
			</Card>
		</div>
	);
};

export default UserCard;
