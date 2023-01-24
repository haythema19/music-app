import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { deleteSongById, getAllSongs } from "../api";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { NavLink } from "react-router-dom";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);

  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);

  return (
    <div className="w-full p4 flex items-center justify-center flex-col">
      <div className="w-full flex items-center">
        <NavLink
          to={"/dashboard/newSong"}
          className="flex items-center px-4 py-3 rounded-md hover:shadow-md cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlusSquare} className="text-headingColor text-3xl" />
        </NavLink>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="text-3xl cursor-pointer text-headingColor ml-3" />
          </motion.i>
        )}
      </div>

      <div className="relative w-full my-4 p-4 py-12 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold  text-headingColor">
            <span className="text-sm font-semibold">
              Hiện có:{" "}
            </span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
          </p>
        </div>

        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="mt-2 w-full flex flex-wrap gap-5 items-center justify-start">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} />
        ))}
    </div>
  );
};

export const SongCard = ({ data, index }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

  const addSongToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };

  const deleteObject = (id) => {
    console.log(id);
    deleteSongById(id).then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative cursor-pointer hover:shadow-xl bg-card hover:bg-cardOverlay shadow-md rounded-lg flex flex-col"
      onClick={addSongToContext}
    >
      {isDeleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="absolute w-full z-10 inset-0 bg-card backdrop-blur-md flex flex-col items-center justify-center gap-3"
        >
          <p className="text-sm text-center text-textColor font-semibold">
            Are you sure do you want to delete this song?
          </p>

          <div className="flex items-center gap-3">
            <button
              className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
              onClick={() => deleteObject(data._id)}
            >
              Yes
            </button>
            <button
              className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
              onClick={() => setIsDeleted(false)}
            >
              No
            </button>
          </div>
        </motion.div>
      )}

      <div className="max-w[52px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          className="w-52 max-w-52 h-52 max-h-52 rounded-lg object-cover"
        />
      </div>

      <p className="ml-2 text-base text-headingColor font-semibold my-2">
        {data.name.length > 20 ? `${data.name.slice(0, 20)}...` : data.name}
        <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
      </p>

      <div className="absolute bottom-1 right-2 flex items-center">
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
          <FontAwesomeIcon icon={faTrash} className="text-base text-red-400 drop-shadow-md hover:text-red-600" />
        </motion.i>
      </div>

      {alert && (
        <>
          {alert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default DashboardSongs;
