import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      console.log("error", error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
