export const ContainerLogo = (props)=>{
    return(
        <section className="items-start flex flex-row gap-5  max-md:mt-[60px] max-md:gap-4">
            {props.children}
        </section>
    )
}

export const ContainerLogin = (props)=>{
    return(
        <section className="items-center flex flex-col">
            {props.children}
        </section>
    )
}

export const ContainerText = (props)=>{
    return(
        <section className="items-center flex flex-col text-center w-72">
            {props.children}
        </section>
    )
}
export const ContainerTextLeft = (props)=>{
    return(
        <section className="items-center flex flex-col text-left w-60 max-md:w-28">
            {props.children}
        </section>
    )
}