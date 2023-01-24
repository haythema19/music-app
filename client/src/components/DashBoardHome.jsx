import React, { useEffect } from "react";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { bgColors } from "../utils/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faUser, faUsers, faList } from "@fortawesome/free-solid-svg-icons";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div className="bg-cardOverlay hover:bg-cardHover w-40 h-40 rounded-md flex flex-col items-center justify-center shadow-md select-none">
      <div className="flex items-center mb-3">
        {icon}
        <p className="ml-3 text-md text-textColor font-semibold">{name}</p>
      </div>

      <p className="text-[30px] font-black text-textColor">{count}</p>
    </div>
  );
};

const DashBoardHome = () => {
  const [{ allUsers, allSongs, artists, allAlbums }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  return (
    <div className="w-full mt-10 p-16 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}
      <DashboardCard icon={<FontAwesomeIcon icon={faUser} className="text-2xl text-textColor" />} name={"Người dùng"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<FontAwesomeIcon icon={faMusic} className="text-2xl text-textColor" />} name={"Bài hát"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<FontAwesomeIcon icon={faUsers} className="text-2xl text-textColor" />} name={"Ca sĩ"} count={artists?.length > 0 ? artists?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<FontAwesomeIcon icon={faList} className="text-2xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    </div>
  );
};

export default DashBoardHome;
