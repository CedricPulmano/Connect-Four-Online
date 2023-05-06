import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div className="nav-links">
            <Link to="/" className="nav-link">
                Connect to a Room
            </Link>
            <Link to="/board" className="nav-link">
                Go to Board
            </Link>
        </div>
    );
};

export default NavigationBar;
