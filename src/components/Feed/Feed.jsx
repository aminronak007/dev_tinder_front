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
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(addFeed(res.data.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0) return <h1>No Feeds are there</h1>;

  return (
    <div className="flex justify-center my-10">
      {feed && feed.map((user) => <UserCard user={user} />)}
    </div>
  );
};

export default Feed;
