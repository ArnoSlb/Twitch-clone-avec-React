import React from "react";
import logo from "../../assets/icons8-twitch.svg";
import search from "../../assets/icons8-search.svg";
import menuIco from "../../assets/icons8-menu.svg";

const Header = () => {

    return (
        <div>
            <nav className="headerTop">
                <ul className="listMenu">
                    <li className="liensNav">
                        <img src={logo} alt="logo twitch" className="logo" />
                    </li>
                    <li className="liensNav">
                        Top Games
                    </li>
                    <li className="liensNav">
                        Top Streams
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