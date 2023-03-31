import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import TypingAnimation from "../components/TypingAnimations";
const inter = Inter({ subsets: ["latin"] });

export default function ChatGPT() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showed, setShowed] = useState(false);

  const bottomRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);
    sendMessage(inputValue);
    setInputValue("");
  };

  const sendMessage = (message) => {
    const url = "/api/chat";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Following Error Occured: " + error);
      });
  };
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <>
      <div className=" w-full  flex md:flex-row flex-col mt-10 gap-[30px] ">
        <div
          className="mt-[0px]  flex lg:flex-row flex-col gap-5 bg-[#13131a]  "
          style={{
            display: showed ? "none" : "block",
            zIndex: showed ? "inherit" : "99999",
          }}
        >
          <div className="flex flex-col lg:h-[600px] md:h-[600px] md:w-[800px] sm:h-[500px] sm:w-[600px] max-w-[1280px] lg:w-[1280px]  justify-center bg-[#1dc071] rounded-[20px]">
            <div className="flex flex-row justify-center ">
              <div className=" relative flex  flex-grow items-center justify-end">
                <h3 className="text-white text-transparent bg-clip-text text-center py-3 font-bold text-4xl">
                  Not ChatGPT
                </h3>
              </div>
              <div className=" relative flex  flex-grow items-center justify-end">
                <button
                  title="Minimize"
                  onClick={() => setShowed(!showed)}
                  className=" relative mr-7 bg-red-200 w-8 h-5  rounded-full drop-shadow-lg flex justify-center items-center text-black text-1xl hover:bg-red-100 hover:drop-shadow-2xl"
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex flex-col overflow-y-scroll  h-screen  bg-black ">
              <div className="flex-grow flex-col-reverse p-6">
                <div className="flex flex-col space-y-4">
                  {chatLog.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`${
                          message.type === "user"
                            ? "bg-purple-500"
                            : "bg-gray-800"
                        } rounded-lg p-4 text-white max-w-sm`}
                      >
                        {message.message}
                      </div>
                      <div ref={bottomRef} />
                    </div>
                  ))}
                  {isLoading && (
                    <div key={chatLog.length} className="flex justify-start">
                      <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                        <TypingAnimation />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex-none p-6">
              <div className="flex rounded-lg border border-gray-700 bg-gray-800">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  disabled={!inputValue}
                  type="submit"
                  className="bg-gradient-to-r from-white  to-white rounded-lg px-4 py-2 text-black font-semibold focus:outline-none  transition-colors duration-300 disabled:opacity-50 "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <button
          title="Contact Sale"
          onClick={() => setShowed(!showed)}
          className="fixed z-90 bottom-10 right-8 bg-purple-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-purple-700 hover:drop-shadow-2xl hover:animate-bounce duration-400"
          style={{
            display: showed ? "block" : "none",
          }}
        >
          &#9993;
        </button>
      </div>
    </>
  );
}
