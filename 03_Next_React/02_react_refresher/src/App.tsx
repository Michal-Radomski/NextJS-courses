import React from "react";

import "./App.scss";
import Post from "./components/Post";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <main>
        <Post author="Maximilian" body="React.js is awesome!" />
        <Post author="Manuel" body="Check out the full course!" />
      </main>
    </React.Fragment>
  );
};

export default App;
