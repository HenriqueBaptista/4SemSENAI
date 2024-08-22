import './style.css'
import { IoMdSearch } from "react-icons/io";

export const Search = ({
    text
}) => {
    return (
        <div className="search-box">
            <IoMdSearch color='rgba(252, 252, 252, 1)' width={13.89} />

            <input className="input" placeholder={text}/>
        </div>
    )
}