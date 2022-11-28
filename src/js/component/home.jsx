import React from "react";

//include images into your bundle
import Todolist from "./Todolist.jsx"

//create your first component
const Home = () => {
	return (
		<div className="container">
			<Todolist/>
		</div>
	);
};

export default Home;
