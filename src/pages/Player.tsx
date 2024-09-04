import { useParams } from "react-router-dom";

function Player() {
  const { username } = useParams();
  return <div>Player {username}</div>;
}

export default Player;
