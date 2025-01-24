import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  const handleBuyMembership = async (membershipType) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType },
        {
          withCredentials: true,
        }
      );
      const { keyId, amount, currency, orderId, notes } = res.data.data;
      const { firstName, lastName, email } = notes;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers.",
        order_id: orderId,
        prefill: {
          name: firstName + " " + lastName,
          email: email,
          contact: "7778015828",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/payment/premium/verify`, {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsPremium(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  return isPremium ? (
    <div className="flex justify-center my-10">
      <h1 className="text-bold text-2xl">You're already a premium user</h1>
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection request per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
            <li> 700rs </li>
          </ul>
          <button
            className="btn btn-neutral"
            onClick={() => handleBuyMembership("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Unlimited connection request per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
            <li> 1400rs </li>
          </ul>
          <button
            className="btn btn-warning"
            onClick={() => handleBuyMembership("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
