import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalState";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import db, { auth, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
const Modal = () => {
  // user info
  const [user] = useAuthState(auth);
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Upload Post");
  const [selectedFile, setSelectedFile] = useState(null);
  const [input, setInput] = useState("");
  // choose image fn()
  const chooseImage = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split("/")[1];
    if (
      fileType !== "jpg" &&
      fileType !== "jpeg" &&
      fileType !== "png" &&
      fileType !== "jfif"
    ) {
      alert(`this format ['${fileType}'] not supported...`);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedFile(reader.result);
        setLoading(false);
      });
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  //   uplaod post fn()
  const uplaodPost = async (e) => {
    e.preventDefault();
    if (loading) return;

    setButtonText("uploading...");

    // add document
    const docRef = await addDoc(collection(db, "posts"), {
      caption: input.trim().toLowerCase(),
      userImage: user?.photoURL,
      username: user?.displayName,
      timestamp: serverTimestamp(),
    });

    console.log("document added", docRef.id);

    // store image
    const storageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(storageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setButtonText("upload post");
    setLoading(true);
    setSelectedFile(null);
    setInput("");
    setOpen(false);
  };

  return (
    <div
      className={`fixed bg-black/80 z-[888] inset-0 h-screen flex justify-center items-start  sm:items-center py-20 sm:py-0 transition-opacity ease-out delay-500  ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      } `}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90vw] sm:max-w-sm bg-white p-4 rounded-sm"
      >
        <form className="flex flex-col gap-y-3">
          {selectedFile ? (
            <div
              className="w-full h-[200px] overflow-hidden rounded-md cursor-pointer shadow-md"
              onClick={() => {
                setSelectedFile(null);
                setLoading(true);
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={selectedFile}
                alt="post image"
              />
            </div>
          ) : (
            <label
              className=" w-14 h-14 rounded-full  mx-auto cursor-pointer flex justify-center items-center bg-red-100"
              htmlFor="image"
            >
              <CameraIcon className="w-7 h-7 text-red-600" />
            </label>
          )}
          <input
            accept="image/*"
            type="file"
            id="image"
            hidden
            onChange={chooseImage}
          />
          <h3 className="text-gray-800 text-lg text-center capitalize font-semibold">
            upload image
          </h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="block w-full text-center placeholder:text-center outline-none py-2"
            placeholder="please enter a caption"
          />
          <button
            type="submit"
            onClick={uplaodPost}
            disabled={loading}
            className="block w-full font-semibold bg-red-500 text-white rounded-md cursor-pointer py-2 capitalize disabled:bg-gray-500 disabled:cursor-auto"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
