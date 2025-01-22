import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../../redux/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {}
  };

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(removeRequest(_id));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No requests found</h1>
      </div>
    );
  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p>
                  {age}, {gender}
                </p>
              )}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-error mx-2"
                onClick={() => handleRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success mx-2"
                onClick={() => handleRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
