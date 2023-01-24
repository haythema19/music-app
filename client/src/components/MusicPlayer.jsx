import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { getAllSongs } from "../api";

import { TbRepeatOff, TbRepeat } from "react-icons/tb";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faPlay,
  faPause,
  faXmark,
  faChevronDown,
  faForward,
  faForwardStep,
  faBackward,
  faBackwardStep,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);

  return (
    <div className="w-full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full items-center justify-center gap-3 p-3 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <div className="flex items-center gap-3 w-[25%] max-w-[25%]">
          <img
            src={allSongs[song]?.imageURL}
            className="w-24 h-24 object-cover rounded-md"
            alt=""
          />
          <div className="flex items-start flex-col">
            <p className="text-xl text-headingColor font-semibold">
              {`${
                allSongs[song]?.name.length > 15
                  ? allSongs[song]?.name.slice(0, 15)
                  : allSongs[song]?.name
              }...`}{" "}
              <span className="text-base">({allSongs[song]?.album})</span>
            </p>
            <p className="text-textColor">
              {allSongs[song]?.artist}{" "}
              <span className="text-sm text-textColor font-semibold">
                ({allSongs[song]?.category})
              </span>
            </p>
            <motion.i
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsPlayList(!isPlayList)}
            >
              <FontAwesomeIcon
                icon={faBarsStaggered}
                className="mt-1 text-textColor hover:text-headingColor text-2xl cursor-pointer"
              />
            </motion.i>
          </div>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[song]?.songUrl}
            onPlay={() => {}}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            customIcons={{
              play: <FontAwesomeIcon icon={faPlay} />,
              pause: <FontAwesomeIcon icon={faPause} />,
              rewind: (
                <FontAwesomeIcon icon={faBackward} className="text-2xl" />
              ),
              previous: (
                <FontAwesomeIcon icon={faBackwardStep} className="text-2xl" />
              ),
              forward: (
                <FontAwesomeIcon icon={faForward} className="text-2xl" />
              ),
              next: (
                <FontAwesomeIcon icon={faForwardStep} className="text-2xl" />
              ),
              loop: <TbRepeat className="text-xl" />,
              loopOff: <TbRepeatOff className="text-xl" />,
              volume: (
                <FontAwesomeIcon icon={faVolumeHigh} className="text-xl" />
              ),
              volumeMute: (
                <FontAwesomeIcon icon={faVolumeMute} className="text-xl" />
              ),
            }}
          />
        </div>
        <div className="h-full w-[10%] max-w-[10%] flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-textColor hover:text-headingColor text-2xl cursor-pointer"
            />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-textColor hover:text-headingColor text-2xl cursor-pointer"
            />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-32 h-32 rounded-full flex items-center justify-center relative ">
            <div className="absolute inset-0 rounded-full gradient blur-md"></div>
            <img
              onClick={togglePlayer}
              src={allSongs[song]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
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

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        song: songindex,
      });
    }
  };

  return (
    <div className="absolute p-2 left-4 bottom-28 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-card">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-cardOverlay hover:rounded-md flex gap-3 items-center cursor-pointer ${
              music?._id === song._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="mr-3 text-textColor group-hover:text-headingColor text-3xl cursor-pointer"
            />

            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 25
                    ? music?.name.slice(0, 25)
                    : music?.name
                }...`}{" "}
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
