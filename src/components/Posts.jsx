import Post from "./Post";
import { query, orderBy, collection, doc } from "firebase/firestore";
import db from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
const Posts = () => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const [postsSnapshot] = useCollection(q);

  return (
    <div className="mt-4 flex flex-col gap-y-3">
      {postsSnapshot?.docs?.length ? (
        postsSnapshot?.docs?.map((post) => {
          return <Post key={post?.id} id={post?.id} {...post?.data()} />;
        })
      ) : (
        <>
          {[...Array(3).keys()]?.map((_, index) => {
            return (
              <div key={index} className="w-full  border border-gray-200">
                <div className="flex items-center gap-x-2 p-2">
                  <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
                  <p className="h-2 w-6 bg-gray-200 animate-pulse"></p>
                </div>
                <div className="h-[300px] bg-gray-200 animate-pulse"></div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Posts;
