import { useSelector } from "react-redux";

function Header() {
  const state = useSelector((state) => state);
  console.log("Header ", state.loggedin.Username);
  return (
    <div className="jumbotron p-3 mb-0 rounded-0 bg-transparent text-white" ></div>
  );
}

export default Header;
