import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Home from "./Home";
import Profile from "./Profile";
import CreateCampaign from "./CreateCampaign";
import CampaignDetails from "./CampaignDetails";
import ChatGPT from "./ChatGPT";
import { Sidebar, Navbar } from "../components";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-campaign" element={<CreateCampaign />} />
      <Route path="/campaign-details/:id" element={<CampaignDetails />} />
      <Route path="/talk-to-gpt" element={<ChatGPT />} />
    </Routes>
  );
}
