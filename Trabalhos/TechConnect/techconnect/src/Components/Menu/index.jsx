import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiHeart3Line } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { TfiPowerOff } from "react-icons/tfi";

const Menu = () => {
  return (
    <div className="flex flex-col h-auto ml-16 mt-12 gap-28 px-2">
      <div className="flex flex-col gap-10">
        <button className="border-r-2 gap-1">
          <BiHomeAlt2 size={20} color="white" />
        </button>
        <button>
          <RiHeart3Line size={20} color="white" />
        </button>
        <button>
          <IoChatbubbleOutline size={20} color="white" />
        </button>
        <button>
          <GoPerson size={20} color="white" />
        </button>
      </div>
      <div>
        <button>
          <TfiPowerOff size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Menu;
