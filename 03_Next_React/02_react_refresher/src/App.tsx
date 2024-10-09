import React from "react";

import "./App.scss";
import PostsList from "./components/PostsList";
import MainHeader from "./components/MainHeader";

const App = (): JSX.Element => {
  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

  function showModalHandler(): void {
    setModalIsVisible(true);
  }

  function hideModalHandler(): void {
    setModalIsVisible(false);
  }

  return (
    <React.Fragment>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostsList isPosting={modalIsVisible} onStopPosting={hideModalHandler} />
      </main>
    </React.Fragment>
  );
};

export default App;
