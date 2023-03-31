import React, { useEffect } from "react";
import Link from "next/link";
import Loader from "../../public/loader.svg";
import { useRouter } from "next/router";
import FundCard from "./FundCard";
import { useNavigate } from "react-router-dom";
import Image from "next/image";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const router = useRouter();
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Image
            src={Loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not create any campaigns yet.
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.title}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
