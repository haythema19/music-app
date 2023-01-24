import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMusic, faCrown } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import { Logo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const Header = () => {
  return (
    <header className="relative flex flex-col min-h-[100vh] min-w-[250px] bg-black">
      <NavLink
        to={"/"}
        className="text-white flex items-center justify-start mt-2 p-2"
      >
        <img src={Logo} className="w-16" alt="" />
        <span className="ml-2 font-bold text-2xl">Music App</span>
      </NavLink>

      <ul className="flex flex-col ml-3">
        <li className="mx-5 p-2 justify-start">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <FontAwesomeIcon icon={faHouse} className="mr-3" />
            <span>Trang chủ</span>
          </NavLink>
        </li>
        <li className="mx-5 p-2 justify-start">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <FontAwesomeIcon icon={faMusic} className="mr-3" />
            Nghe nhạc
          </NavLink>
        </li>
        <li className="mx-5 p-2 justify-start">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <FontAwesomeIcon icon={faCrown} className="mr-3" />
            Nâng cấp
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
