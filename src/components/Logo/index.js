import React from "react";
import "./index.css";
import logo from "./img/logo.png";

const Logo = () => {
	return (
		<div className="logo">
			<img src={logo} alt="logo" className="logo_header" />
		</div>
	);
};

export default Logo;
