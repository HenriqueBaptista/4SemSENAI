import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { Spinner } from "../Spinner"


export const ButtonMenu = () => {
    return (
        <button className='fixed bottom-20 right-36'>
            <FiPlusCircle size={50} color='white' />
        </button>
    )
}

export const Button = ({
    buttonTitle,
    onClick,
    load
}) => {
    return (
        <div className="flex flex-col items-center">
            <button
                disabled={load}
                onClick={onClick}
                className={`bg-primary-white w-[386px] max-md:w-[260px] h-[47px] max-md:h-[40px] rounded-[8px] max-md:rounded-[20px] flex items-center justify-center`}
            >
                {
                    load ? <Spinner /> : <p className="font-poppins uppercase font-light text-xl max-md:text-[16px] text-primary-black">{buttonTitle}</p>
                }
            </button>
        </div>

    )
}

export const LinkButton = ({
    children,
    onClick
}) => {
    return (
        <a
            onClick={onClick}
            className="text-complementary-blue max-md:text-sm hover:cursor-pointer "
        >{children}</a>
    )
}
