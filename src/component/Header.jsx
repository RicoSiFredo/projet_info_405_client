import PageEnum from "../enum/PageEnum";
import Utils from "../utils/Utils";
import React from "react"
import { Bell, BellFill, Search } from "react-bootstrap-icons";
import { Badge, Button } from "react-bootstrap";
import { useEffect,useState } from "react";
import ErrorEats from "../object/base/ErrorEats";
import CompareEats from "../object/base/CompareEats";
import ListEats from "../object/base/ListEats";
import Eats from "../object/base/Eats";
import Constant from "../utils/Constant";
import { useLocation } from 'react-router-dom'

function Header({user, navigate, search, updateSearch, notif, updateNotif}){
    const location = useLocation();
    const [pathname, updatePathname] = useState("/");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    useEffect(function(){
        if(!location.pathname.includes("/search/")){
            updatePathname(location.pathname);
        }
    }, [location.pathname, ])
    
    function openNotif(){
        updateNotif(!notif);
    }
    let button;
    if (user.logged){
        button = <div>
            <Button onClick={openNotif} className="me-3">
                <BellFill></BellFill>
                <Badge pill className="ms-2" bg="light" text="primary">9</Badge>
            </Button>
        </div>
    }
    else {
        let titleInscription = "Inscription";
        let titleConnexion = "Connexion";
        function connexion(){
            navigate("/login");
        }
        function inscription(){
            navigate("/register");
        }
        button = <div>
            <button className='btn btn-primary me-3' onClick={inscription}>{titleInscription}</button>
            <button className='btn btn-primary me-3' onClick={connexion}>{titleConnexion}</button>
        </div>
    }
    function home(){
        navigate('/');
    }
    function back(){
        navigate(-1)
    }
    
    const [focused, setFocused] = useState(false)
    const onFocus = function(){
        setFocused(true)
        chercher(true, "")
    }
    const onBlur = function(){
        //setFocused(false)
        //chercher(false, "")
    }
  
    function chercherEvent(e){
        updateSearch(e.target.value);
        chercher(focused, e.target.value);
    }
    list.update = function(){
        updateList(Eats.fakeUpdate(list));
    }

    function chercher(focused, search_base=search){
        if(!focused){
            navigate(pathname)
        }
        else {
            navigate("/search/"+search_base);
        }
    }

    return (
        <nav className="navbar navbar-dark bg-dark justify-content-between">            <button className='ms-3 btn btn-primary me-3' onClick={back}>Retour</button>
            <div className="navbar-brand ps-2 click" onClick={home}>
                <img src={Constant.BASE_IMAGE + "logo_usmb.png"} width="30" height="30" className="align-top" alt=""/>
                <h4 className="p-3 d-inline">Projet 405</h4>
            </div>
            <div>
                <div className="input-group">
                    <div>
                        <input onChange={chercherEvent} type="search" id="form1" className="form-control" placeholder="Rechercher" value={search} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <button  type="button" className="d-flex align-items-center justify-content-center btn btn-primary">
                        <Search></Search>
                    </button>
                </div>
            </div>
            <div>
                {button}
            </div>
        </nav>
    )
}
export default Header;