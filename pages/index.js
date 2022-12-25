import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import kohaImage from "../assets/koha.jpg";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [userName, setUserName] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    if (userName === "") {
      setIsGenerating(false);
      return;
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, userName }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const prefillInput = async () => {
    setUserName("Joshua");
    setUserInput(
      "Jude is the best friend to go fishing with. Has the sharpest taste in music."
    );
    await callGenerateEndpoint();
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onUserName = (event) => {
    setUserName(event.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiOutput);
    setCopyText("Copied");
    setTimeout(() => setCopyText("Copy"), 3000);
  };

  return (
    <div className="root">
      <Head>
        <title>
          Bloop - Send fun, merry greetings faster that you can spell jack{" "}
        </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>:Bloop</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Bloop is gonna help you write the sweetest christmas greetings to
              the ones you love.{" "}
              <span className="show-sample" onClick={prefillInput}>
                Show me an example
              </span>
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <input
            className="name-box"
            onChange={onUserName}
            value={userName}
            placeholder="What's your name?"
          />
          <textarea
            value={userInput}
            onChange={onUserChangedText}
            placeholder="Tell me something special about him/her"
            className="prompt-box"
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
                <p className="copyBtn" onClick={copyToClipboard}>
                  {copyText}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://twitter.com/kohawithstuff"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={kohaImage} alt="koha logo" />
            <p>koha.gg</p>
          </div>
        </a>
      </div> */}
      <div className="footer">
        <p>
          Love,{" "}
          <a
            href="https://twitter.com/kohawithstuff"
            target="_blank"
            rel="noreferrer"
          >
            Koha🌵
          </a>{" "}
          and Jide
        </p>
        <p>
          <a
            href="https://www.buymeacoffee.com/koha"
            target="_blank"
            rel="noreferrer"
          >
            Buy Me Chicken nuggetsssssss🍗
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
