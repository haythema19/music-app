import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { DashboardNewSong } from ".";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashBoardHome from "./DashBoardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="w-full flex">
      <Header />
      <div className="w-full flex flex-col items-center">
        <div className="w-full my-2 p-4 flex items-center justify-evenly">
          {/* prettier-ignore */}
          <NavLink to={"/dashboard/home"}><FontAwesomeIcon icon={faHouse} className="text-2xl text-textColor" /></NavLink>
          {/* prettier-ignore */}
          <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Users </NavLink>

          {/* prettier-ignore */}
          <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Songs </NavLink>

          {/* prettier-ignore */}
          <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Artist </NavLink>

          {/* prettier-ignore */}
          <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Albums </NavLink>
        </div>

        <div className="w-full">
          <Routes>
            <Route path="/home" element={<DashBoardHome />} />
            <Route path="/user" element={<DashboardUser />} />
            <Route path="/songs" element={<DashboardSongs />} />
            <Route path="/artist" element={<DashboardArtist />} />
            <Route path="/albums" element={<DashboardAlbum />} />
            <Route path="/newSong" element={<DashboardNewSong />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
