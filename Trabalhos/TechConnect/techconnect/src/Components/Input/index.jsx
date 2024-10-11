import React from "react";

export const Input = ({ onChange, label, erro, value }) => {
  return (
    <div className={`flex flex-col items-center`}>
      <div className="flex flex-col gap-3 max-md:gap-1">
        <p
          className={`font-poppins ${
            erro ? "text-complementary-red" : "text-primary-white"
          } text-lg max-md:text-[13px]`}
        >
          {label}
        </p>

        <input
          type="text"
          className={`bg-transparent border-b-2 ${
            erro ? "border-complementary-red" : "border-primary-white"
          } w-96 max-md:w-[260px] ${
            erro ? "text-complementary-red" : "text-primary-white"
          } focus:outline-0 focus:border-primary-white focus:text-primary-white`}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export const InputHome = ({value, onChange}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="bg-primary-black border-[1px] rounded-md w-full text-primary-white placeholder:text-white pl-3 pr-12 py-2"
        placeholder="Digite um comentário..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
