import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../redux/feedSlice";
import UserCard from "../UserCard/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(addFeed(res.data.data));
      }
    } catch (error) {}
  };

  const handleConnections = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        getFeed();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Feeds are there</h1>
      </div>
    );

  return (
    <div className="flex justify-center my-10">
      {feed &&
        feed.map((user) => (
          <UserCard user={user} handleConnections={handleConnections} />
        ))}
    </div>
  );
};

export default Feed;
