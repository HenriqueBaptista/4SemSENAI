export const Title = ({
    children,
    styles
}) => {
    return (
        <h1 className={`font-poppins text-primary-white text-5xl max-md:text-2xl uppercase tracking-widest text-center ${styles}`}>{children}</h1>
    )
}

export const Subtitle = ({
    children,
    styles
}) => {
    return (
        <p className={`font-poppins text-primary-white text-xl max-md:text-[13px] max-md:w-[260px] w-[386px] text-center ${styles}`}>{children}</p>
    )
}

export const Text = ({
    children,
    styles,
    erro = false
}) => {
    return (
        <p className={`font-poppins ${erro ? "text-complementary-red" : "text-primary-white"} text-center text-[15px] max-md:text-xs ${styles}`}>{children}</p>
    )
}