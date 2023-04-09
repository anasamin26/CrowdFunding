import React, { useEffect } from "react";
import Link from "next/link";
import Loader from "../../public/loader.svg";
import { useRouter } from "next/router";
import FundCard from "./FundCard";
import { useNavigate } from "react-router-dom";
import Image from "next/image";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="relative sm:-8 p-4  min-h-screen flex flex-row bg-[#13131a]">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <div className="w-full h-screen flex md:flex-row flex-col mt-10 gap-[30px]">
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            {title} ({campaigns.length})
          </h1>

          <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
              <img
                src={Loader}
                alt="loader"
                className="w-[100px] h-[100px] object-contain"
              />
            )}

            {!isLoading && campaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campigns yet
              </p>
            )}

            {!isLoading &&
              campaigns.length > 0 &&
              campaigns.map((campaign) => (
                <FundCard
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCampaigns;
