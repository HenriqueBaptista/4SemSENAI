import LogoConnect from "../../Assets/Images/LogoConnect.png";

export const Logo = () => {
    return (
        <div className="flex flex-col items-center">
            <img className="w-[320px] max-md:w-[236px]" src={LogoConnect} alt="Logo da Tech Connect" />
        </div>
    )
}