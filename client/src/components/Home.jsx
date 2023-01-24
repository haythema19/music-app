import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { SongCard } from "./DashboardSongs";
import Filter from "./Filter";
import Header from "./Header";
import TopBar from "./TopBar";
import { motion } from "framer-motion";

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);

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
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  return (
    <div className="w-full h-auto flex flex-col">
      <div className="flex w-full">
        <Header />
        <div className="w-full">
          <TopBar />
          {searchTerm.length > 0 && (
            <p className="-mt-5 ml-6 text-base text-textColor">
              Searched for :
              <span className="text-xl text-cartBg font-semibold">
                {searchTerm}
              </span>
            </p>
          )}
          <div className="w-full h-auto flex items-center justify-start gap-4 flex-wrap p-4">
            <Filter setFilteredSongs={setFilteredSongs} />
            <HomeSongContainer
              musics={filteredSongs ? filteredSongs : allSongs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
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
  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-52 cursor-pointer hover:shadow-xl hover:bg-cardOverlay bg-card shadow-md rounded-lg flex flex-col"
          onClick={() => addSongToContext(index)}
        >
          <div className="w-52 h-52 rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className="w-52 h-52 rounded-lg object-cover"
            />
          </div>

          <p className="ml-3 text-base text-headingColor font-semibold my-2">
            {data.name.length > 20 ? `${data.name.slice(0, 20)}...` : data.name}
            <span className="block text-sm text-gray-400 my-1">
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
};

export default Home;
