import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div className="background-image pt-56 ps-10">
        <h1 className="text-7xl text-slate-50 font-bold">Depression Bot</h1>
        <p className="text-slate-300 mt-5 text-3xl font-semibold">
          Do you have Depression or not
        </p>
        <p className="text-yellow-200 mt-5 text-2xl font-medium">Let's Check</p>
        <Link to="/prediction">
          <button className="btn btn-lg btn-outline btn-warning mt-5">
            Check
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
