import React from "react";
import "./index.css";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
	return (

		<Link to={'/'} className="logo">
			<img src={logo} alt="logo" className="logo_header" />
		</Link>

	);
};

export default Logo;
