import React from "react";

import "./App.scss";

const Exercise = (): JSX.Element => (
  <>
    <textarea autoFocus={true} />
    <br />
    <label htmlFor="disk_c">Disk usage C:</label>
    <meter id="disk_c" value="2" min="0" max="10">
      2 out of 10
    </meter>
    <br />
    <label htmlFor="disk_d">Disk usage D:</label>
    <meter id="disk_d" value="0.6">
      60%
    </meter>
  </>
);

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Exercise />
    </React.Fragment>
  );
};

export default App;
