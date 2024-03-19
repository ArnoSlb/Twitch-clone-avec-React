import React, {useState, useEffect} from "react";
import logo from "../../assets/icons8-twitch.svg";
import search from "../../assets/icons8-search.svg";
import menuIco from "../../assets/icons8-menu.svg";
import cross from "../../assets/icons8-cross.png"
import { Link } from "react-router-dom";

const Header = () => {

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }
    })

    const handleMediaQueryChange = mediaQuery => {
        if(mediaQuery.matches) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false)
        }
    }

    const toggleNavRes = () => {
        showMenu(!menu);
    }

    const hideMenu = () => {
        if (menu === true){
            showMenu(!menu)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleKeyPress = (e) => {
        setSearchInput(e.target.value);
    }


    return (
        <div>
            <nav className="headerTop">
                {(menu || !smallScreen) && (
                    <ul className="listMenu">
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="/">
                                <img src={logo} alt="logo twitch" className="logo" />
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="liensNav ">
                            <Link className="lien purpleHover" to="/">
                                Top Games
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="liensNav ">
                            <Link className="lien purpleHover" to="/top-streams">
                                Top Streams
                            </Link>
                        </li>
                        <li className="liensNav">
                            <form className="formSubmit" onSubmit={(e) => handleSubmit(e)}>
                                <input required value={searchInput} type="text" className="inputSearch" placeholder="Rechercher" onChange={(e) => handleKeyPress(e)}/>
                                <Link 
                                    className="lien"
                                    to={{
                                        pathname: `/result/${searchInput}`
                                    }}>
                                        <button type="submit">
                                            <img src={search} alt="icone loupe" className="logoSearch" />
                                        </button>
                                </Link>
                            </form>
                        </li>
                    </ul>
                )}
            </nav>
            <div className="menuResBtn">
                <img onClick={toggleNavRes} src={!menu ? menuIco : cross} alt="icone menu responsive" className="menuIco" />
            </div>
        </div>
    )
}

export default Header;