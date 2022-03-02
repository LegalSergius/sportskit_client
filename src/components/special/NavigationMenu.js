import React from 'react';
import '../../styles/regular/Header.css';
import {Link} from "react-router-dom";
import {ENTER_PAGE, SERVICE_PANEL} from "../../routing/routing_consts";
import {changeAuthState} from "../../utils/UserUtils";
import {linkObject} from "../../utils/ComponentUtils";

export function NavigationMenu({isAuth, userRole, logOut}) {
    return (
        <ul className="authList">
            {isAuth?
                <>
                    <li className="authListItem">
                        <img
                            id="authStateImage"
                            className="authListItem"
                            src="/static/exit_door.png"
                            alt="Выход"/>
                        <span
                            className="authListItemLink"
                            onClick={logOut}>
                            Выйти
                        </span>
                    </li>
                    {(userRole === 'ADMIN') &&
                    <li
                        id="adminItem"
                        className="authListItem">
                        <Link
                            to={linkObject(SERVICE_PANEL, false)}
                            className="authListItemLink">
                            Служебная панель
                        </Link>
                    </li> }
                </>
                :
                <>
                    <li className="authListItem">
                        <img
                            id="authStateImage"
                            className="authListItem"
                            src="/static/enter_door.png"
                            alt="Вход"/>
                        <Link
                            to={{
                                pathname: ENTER_PAGE + 'user',
                            }}
                            className="authListItemLink">
                            Войти
                        </Link>
                    </li>
                    <li
                        id="adminItem"
                        className="authListItem">
                        <Link
                            to={{
                                pathname: ENTER_PAGE + 'admin'
                            }}
                            className="authListItemLink">
                            Я - админ.
                        </Link>
                    </li>
                </>
            }
        </ul>
    );
}