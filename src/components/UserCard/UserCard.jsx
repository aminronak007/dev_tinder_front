import React from "react";

const UserCard = ({ user, flag = true, handleConnections = null }) => {
  const {
    _id,
    firstName = "",
    lastName = "",
    photoUrl = "",
    about = "",
    age,
    gender,
  } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        <p>{about}</p>

        {flag && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-error"
              onClick={() => handleConnections("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleConnections("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
