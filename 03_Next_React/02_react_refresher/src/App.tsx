import React from "react";

// import "./App.scss";
import PostsList from "./components/PostsList";
import MainHeader from "./components/MainHeader";

//* Is not necessary
const App = (): JSX.Element => {
  // const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

  // function showModalHandler(): void {
  //   setModalIsVisible(true);
  // }

  // function hideModalHandler(): void {
  //   setModalIsVisible(false);
  // }

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <PostsList />
      </main>
    </React.Fragment>
  );
};

export default App;
