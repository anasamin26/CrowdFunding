import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import DisplayCampaigns from "../components/DisplayCampaigns";
import { Sidebar, Navbar } from "../components";
const Profile = () => {
  const [isLoading, setisLoading] = useState(false);
  const [campaigns, setcampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();
  const fetchCampaigns = async () => {
    setisLoading(true);
    const data = await getUserCampaigns();
    setcampaigns(data);
    setisLoading(false);
  };
  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <div className="relative sm:-8 p-4  min-h-screen flex flex-row bg-[#13131a]">
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Profile;
