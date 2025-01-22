import React, { useState } from "react";
import UserCard from "../UserCard/UserCard";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  if (!user) return;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="mt-10 mb-5">
              <div className="my-4">
                <label className="input input-bordered flex items-center gap-2 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div className="my-4">
                <label className="input input-bordered flex items-center gap-2 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div className="my-4">
                <label className="input input-bordered flex items-center gap-2 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="PhotoUrl"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>
              <div className="my-4">
                <label className="input input-bordered flex items-center gap-2 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Age"
                    value={age ?? age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>
              <div className="my-4">
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="select w-full max-w-xs"
                  defaultValue={gender}
                >
                  <option disabled>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="my-4">
                <textarea
                  className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard
        user={{ firstName, lastName, photoUrl, age, about, gender }}
        flag={false}
      />
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
