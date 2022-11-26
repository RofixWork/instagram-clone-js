import React, { useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  PaperAirplaneIcon,
  ChatBubbleLeftEllipsisIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "../firebase";
import TimeAgo from "timeago-react";
import { useCollection } from "react-firebase-hooks/firestore";
import Likes from "./Likes";
const Post = ({ id, username, image, userImage, caption }) => {
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth);
  const docRef = doc(db, "posts", id);
  const q = query(collection(docRef, "comments"), orderBy("timestamp", "desc"));
  const [commentsSnapshot] = useCollection(q);

  const ref = doc(db, "posts", id);

  const [likesSnapshot] = useCollection(collection(ref, "likes"));

  // sendComemnt fn()
  const sendComment = async (e) => {
    e.preventDefault();

    setComment("");

    // add comment in DB
    const docRef = doc(db, "posts", id);
    await addDoc(collection(docRef, "comments"), {
      username: user?.displayName,
      userImage: user?.photoURL,
      comment,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="border border-gray-100 rounded-md bg-white shadow-md">
      {/* header */}
      <div className="px-2 py-2 flex justify-between items-center">
        <div className="flex items-center gap-x-2 ">
          <div className="h-9 w-9 overflow-hidden  border-2 border-gray-300 rounded-full p-[1px]">
            <img
              src={userImage}
              alt="user image"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h4 className="text-sm">{username}</h4>
        </div>
        <EllipsisHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      {/* header */}
      {/* post image */}
      <div>
        <img
          src={image}
          alt="post image"
          className="w-full object-cover object-center"
        />
      </div>
      {/* post image */}
      {/* icons */}
      <div className="py-2 px-3 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Likes id={id} />
          <PaperAirplaneIcon className="h-5 w-5 cursor-pointer" />
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5 cursor-pointer " />
        </div>
        <BookmarkIcon className="h-5 w-5 cursor-pointer" />
      </div>
      {/* icons */}
      {/* desc and likes */}
      <div className=" py-1 px-3">
        <p className="font-bold text-sm mb-1">
          {likesSnapshot ? likesSnapshot?.docs?.length : ""} likes
        </p>
        <div className="flex items-center gap-x-1">
          <h4 className="font-bold text-sm whitespace-nowrap">{username}</h4>
          <p className="text-sm truncate w-">{caption}</p>
        </div>
      </div>
      {/* desc and likes */}

      {/* comments */}
      <div className="my-3 px-3 h-auto max-h-[250px] flex flex-col gap-y-3 overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
        {commentsSnapshot?.docs?.length
          ? commentsSnapshot?.docs?.map((comment) => {
              return (
                <div
                  key={comment?.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-x-1 items-center ">
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      <img
                        src={comment?.data()?.userImage}
                        alt={comment?.data()?.username}
                        className="w-full h-full object-cover object-center"
                      />
                      {/* comment?.data()?.userImage */}
                    </div>
                    <h4 className="ml-1 text-sm font-bold">
                      {comment?.data()?.username}
                    </h4>
                    <p>{comment?.data()?.comment}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <TimeAgo
                      live={false}
                      datetime={comment?.data()?.timestamp?.toDate()}
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* comments */}

      {/* comment */}
      <form className="flex items-center gap-x-2 py-3 px-2 ">
        <FaceSmileIcon className="h-5 w-5" />
        <input
          className="flex-1 outline-none py-0 text-sm placeholder:text-sm"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={!comment?.trim()}
          onClick={sendComment}
          className="text-xs font-bold text-blue-500 disabled:text-gray-300"
          type="submit"
        >
          Post
        </button>
      </form>
      {/* comment */}
    </div>
  );
};

export default Post;
