import React from "react";

const ProfileCard = ({
  title,
  handle,
  image,
  description,
}: {
  title: string;
  handle: string;
  image: string;
  description: string;
}): JSX.Element => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-image">
          <figure className="image is-1by1">
            <img src={image} alt="pda logo" />
          </figure>
        </div>

        <div className="card-content">
          <div className="media-content">
            <p className="title is-4">{title}</p>
            <p className="subtitle is-6">{handle}</p>
          </div>
          <div className="content">{description}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileCard;
