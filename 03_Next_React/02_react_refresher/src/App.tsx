import React from "react";

import "./App.scss";
import PostsList from "./components/PostsList";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <PostsList />
    </React.Fragment>
  );
};

export default App;
