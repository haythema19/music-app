import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";

import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { actionType } from "../Context/reducer";
import { getAllAlbums } from "../api";

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="relative w-full gap-5  my-4 p-4 py-12 rounded-md flex flex-wrap justify-start">
        {allAlbums &&
          allAlbums.map((data, index) => (
            <>
              <AlbumCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative overflow-hidden w-52 max-w-52 gap-5 cursor-pointer hover:shadow-xl hover:bg-cardOverlay bg-card shadow-md rounded-lg flex flex-col"
    >
      <img
        src={data?.imageURL}
        className="max-w-52 w-52 max-h-52 h-52 object-cover rounded-md"
        alt=""
      />

      <p className="ml-3 mb-3 text-base text-textColor">{data.name}</p>

      <motion.i
        className="absolute bottom-3 right-3"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Bạn có chắc chắn muốn xóa không?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="bg-red-300 px-3 rounded-md">
              <p className="text-headingColor text-sm">Có</p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">Không</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardAlbum;
