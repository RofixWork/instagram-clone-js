import { useEffect, useState } from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db, { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
const Likes = ({ id }) => {
  // like state
  const [hasLiked, setHasLiked] = useState(false);
  const [user] = useAuthState(auth);

  const docRef = doc(db, "posts", id);
  const q = query(
    collection(docRef, "likes"),
    where("username", "==", user?.displayName)
  );
  const [likesSnapshot] = useCollection(q);

  console.log(likesSnapshot?.docs?.length);

  const likePost = async () => {
    await setDoc(doc(db, "posts", id, "likes", user?.uid), {
      username: user?.displayName,
    });
  };
  const dislike = async () => {
    await deleteDoc(doc(db, "posts", id, "likes", user?.uid));
  };
  useEffect(() => {
    if (likesSnapshot?.docs?.length) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likesSnapshot]);

  return (
    <div>
      {hasLiked ? (
        <HeartIconSolid
          onClick={() => {
            setHasLiked(false);
            dislike();
          }}
          className="h-6 w-6 text-red-500 cursor-pointer"
        />
      ) : (
        <HeartIcon
          onClick={() => {
            setHasLiked(true);
            likePost();
          }}
          className="h-5 w-5 cursor-pointer "
        />
      )}
    </div>
  );
};

export default Likes;
