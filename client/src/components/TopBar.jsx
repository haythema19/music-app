import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faSearch } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => {
  const [{ searchTerm, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full flex items-center justify-evenly p-6">
      <div className="flex items-center rounded-3xl w-[40%] p-2 bg-primary">
        <FontAwesomeIcon icon={faSearch} className="text-2xl mx-2 mr-3" />
        <input
          type="text"
          value={searchTerm}
          className="w-full h-full p-2f bg-transparent text-sm text-black border-none outline-none "
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerpolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member.{" "}
            <FontAwesomeIcon
              icon={faCrown}
              className="text-xm -ml-1 text-yellow-500"
            />{" "}
          </p>
        </div>

        {isMenu && (
          <motion.ul
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-50 top-12 right-0 w-275 p-2 bg-cardOverlay shadow-2xl rounded-md backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base p-2 text-textColor duration-150 transition-all ease-in-out hover:bg-[#535353] hover:rounded-sm">
                Người dùng
              </p>
            </NavLink>
            <p className="text-base p-2 text-textColor duration-150 transition-all ease-in-out hover:bg-[#535353] hover:rounded-sm">
              Sở thích của tôi
            </p>
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base p-2 text-textColor duration-150 transition-all ease-in-out hover:bg-[#535353] hover:rounded-sm">
                  Bảng điều khiển
                  </p>
                </NavLink>
              </>
            )}
            <p
              className="text-base p-2 text-textColor duration-150 transition-all ease-in-out hover:bg-[#535353] hover:rounded-sm"
              onClick={logout}
            >
              Đăng xuất
            </p>
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default TopBar;
