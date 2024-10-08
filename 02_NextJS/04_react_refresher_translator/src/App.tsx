import React from "react";
import "bulma/css/bulma.css";

import ProfileCard from "./ProfileCard";
import AlexaImage from "./images/alexa.png";
import CortanaImage from "./images/cortana.png";
import SiriImage from "./images/siri.png";
import "./App.scss";

// const Exercise = (): JSX.Element => (
//   <>
//     <textarea autoFocus={true} />
//     <br />
//     <label htmlFor="disk_c">Disk usage C:</label>
//     <meter id="disk_c" value="2" min="0" max="10">
//       2 out of 10
//     </meter>
//     <br />
//     <label htmlFor="disk_d">Disk usage D:</label>
//     <meter id="disk_d" value="0.6">
//       60%
//     </meter>
//   </>
// );

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* <Exercise /> */}

      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <p className="title">Personal Digital Assistants</p>
          </div>
        </section>

        <div className="container">
          <section className="section">
            <div className="columns">
              <div className="column is-4">
                <ProfileCard
                  title="Alexa"
                  handle="@alexa99"
                  image={AlexaImage}
                  description="Alexa was created by Amazon and helps you buy things."
                />
              </div>
              <div className="column is-4">
                <ProfileCard
                  title="Cortana"
                  handle="@cortana32"
                  image={CortanaImage}
                  description="Cortana was made by Microsoft. Who knows what it does?"
                />
              </div>
              <div className="column is-4">
                <ProfileCard
                  title="Siri"
                  handle="@siri01"
                  image={SiriImage}
                  description="Siri was made by Apple and is being phased out"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
