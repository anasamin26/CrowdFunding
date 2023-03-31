import React, { useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { CustomButton } from "../components";
import { checkIfImage } from "../utils";
import { Sidebar, Navbar, FormField } from "../components";
import { useStateContext } from "../context";
const CreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const { createCampaign } = useStateContext();
  const handleFromFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        window.location.href = "/";
      } else {
        alert("Provide Valid Image URL for the Campaign");
        setForm({ ...form, image: "" });
      }
    });

    console.log(form);
  };
  return (
    <div className="relative sm:-8 p-4  min-h-screen flex flex-row bg-[#13131a]">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          {isLoading && "Loader..."}
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] ">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Start a Campaign
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Youe Name *"
                placeholder="John Doe"
                inputType="text"
                value={form.name}
                handleChange={(e) => {
                  handleFromFieldChange("name", e);
                }}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Write a titile"
                inputType="text"
                value={form.title}
                handleChange={(e) => {
                  handleFromFieldChange("title", e);
                }}
              />
            </div>
            <FormField
              labelName="Story *"
              placeholder="Write your Story"
              isTextArea
              value={form.description}
              handleChange={(e) => {
                handleFromFieldChange("description", e);
              }}
            />

            <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[100px] rounded-[10px]">
              <img
                src="/money.png"
                alt="money"
                className="w-[35px] h-[35px] object-contain"
              />
              <h4 className="font-epilogue font-bold text-[20px] text-white ml-[20px]">
                You will get 100% of the raised amount
              </h4>
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Goal *"
                placeholder="Eth 0.50"
                inputType="text"
                value={form.target}
                handleChange={(e) => {
                  handleFromFieldChange("target", e);
                }}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => {
                  handleFromFieldChange("deadline", e);
                }}
              />
            </div>
            <FormField
              labelName="Campaign Image *"
              placeholder="Place image URL of your campaign"
              inputType="text"
              value={form.image}
              handleChange={(e) => {
                handleFromFieldChange("image", e);
              }}
            />
            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Submit new campaign"
                styles="bg-[#1dc071]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
