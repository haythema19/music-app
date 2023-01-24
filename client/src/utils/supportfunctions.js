import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Nhạc Việt", value: "nhacviet" },
  { id: 3, name: "Nhạc Âu Mỹ", value: "nhacaumy" },
  { id: 4, name: "Thư Giản", value: "thugian" },
  { id: 5, name: "Karoke", value: "karoke" },
  { id: 6, name: "Remix", value: "Remix" },
  { id: 7, name: "Tẩm Đá", value: "tamda" },
];

export const filterByLanguage = [
  { id: 1, name: "Vietnamese", value: "vietnamese" },
  { id: 2, name: "English", value: "english" },

];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
