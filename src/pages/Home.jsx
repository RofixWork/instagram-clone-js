import React from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <>
      <Feed />
      <Modal />
    </>
  );
};

export default Home;
