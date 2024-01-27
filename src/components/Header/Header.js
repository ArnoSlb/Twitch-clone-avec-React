import React from "react";
import logo from "../../assets/icons8-twitch.svg";
import search from "../../assets/icons8-search.svg";
import menuIco from "../../assets/icons8-menu.svg";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <div>
            <nav className="headerTop">
                <ul className="listMenu">
                    <li className="liensNav">
                        <Link className="lien" to="/">
                            <img src={logo} alt="logo twitch" className="logo" />
                        </Link>
                    </li>
                    <li className="liensNav">
                        <Link className="lien" to="/">
                            Top Games
                        </Link>
                    </li>
                    <li className="liensNav">
                        <Link className="lien" to="/top-streams">
                            Top Streams
                        </Link>
                    </li>
                    <li className="liensNav">
                        <form action="" className="formSubmit">
                            <input type="text" className="inputSearch" placeholder="Rechercher"/>
                            <button type="submit">
                                <img src={search} alt="icone loupe" className="logoSearch" />
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
            <div className="menuResBtn">
                <img src={menuIco} alt="icone menu responsive" className="menuIco" />
            </div>
        </div>
    )
}

export default Header;