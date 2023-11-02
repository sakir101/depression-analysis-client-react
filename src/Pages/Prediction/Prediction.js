import React, { useEffect, useState } from "react";

import profile from "../../Asset/Banner/profile.jpg";
import ai from "../../Asset/Banner/ai.jpg";
import { useForm } from "react-hook-form";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";

const Prediction = () => {
  const { register, handleSubmit, reset } = useForm();
  const [text, setText] = useState([]);
  const [text1, setText1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatNumber, setChatNumber] = useState(0);
  const [userNumber, setUserNumber] = useState(0);

  function getFirstFourWords(text) {
    // Split the text into words using spaces as the delimiter
    const words = text.split(" ");

    // Select the first four words and join them back into a string
    const firstFourWords = words.slice(0, 4).join(" ");

    return firstFourWords;
  }

  const handleMessage = (data) => {
    setUserNumber(parseInt(userNumber) + 1);
    setLoading(true);
    setText([...text, data.message]);
    const data1 = {
      clean_text: data.message,
    };
    reset();
    console.log(JSON.stringify(data1));

    fetch("http://localhost:3000/processText", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((res) => res.json())
      .then((data) => {
        setChatNumber(parseInt(chatNumber) + 1);
        setLoading(false);

        if (data.prediction === 1) {
          const para = "I think you have depression. Consult with doctor.";
          setText1([...text1, para]);
        } else {
          const para = "You are cool";
          setText1([...text1, para]);
        }
      })
      .catch((err) => console.error(err));
  };

  const userSections = Array.from({ length: userNumber }, (_, index) => (
    <div className="flex items-start mt-10 ms-4" key={index}>
      <div className="avatar">
        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={profile} alt={`User ${index + 1}`} />
        </div>
      </div>
      <div className="ms-4">
        <h1 className="font-normal text-xl">
          {getFirstFourWords(text[index])}...
        </h1>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-4">
      <div className=" bg-stone-300">
        <div>
          <h1 className="text-2xl font-semibold mb-5 ms-2">Chats</h1>
          <span className="text-2xl font-semibold mt-12 ms-4">
            Total Chat Number: {chatNumber}
          </span>
        </div>
        {userSections}
      </div>

      <div className="col-span-3 bg-slate-300 p-10">
        <div
          className="bg-gray-200 rounded-xl w-full p-5"
          style={{ minHeight: "600px" }}
        >
          {text.length ? (
            text.map((message, index) => (
              <div>
                <div className="flex items-start">
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={profile} alt="User" />
                    </div>
                  </div>
                  <div className="ms-4">
                    <p className="">{message}</p>
                  </div>
                </div>

                <div className="flex flex-row-reverse items-center mt-5 mb-10">
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={ai} alt="AI" />
                    </div>
                  </div>
                  <div className="me-4">
                    {index === text1.length && loading ? (
                      <Loader size={8} />
                    ) : (
                      <p>{text1[index]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your Message</p>
          )}
        </div>
        <div className="mt-6">
          <form action="" onSubmit={handleSubmit(handleMessage)}>
            <input
              type="text"
              placeholder="Type here"
              {...register("message")}
              className="input input-bordered input-primary w-5/6"
            />
            <input
              type="submit"
              value="Send"
              className="btn ms-5"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
