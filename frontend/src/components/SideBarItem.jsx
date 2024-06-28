import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = ({ srcImg, alt, text, link }) => {
  return (
    <div className="flex items-center">
      <Link to={link}>
        <button className="flex gap-5">
          <img
            src={srcImg}
            alt={alt}
            height={30}
            width={30}
            className="flex items-center"
          ></img>
          <span className="flex items-center pt-[8px]">{text}</span>
        </button>
      </Link>
    </div>
  );
};

export default SideBarItem;
