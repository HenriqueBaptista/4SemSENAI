import { useState } from 'react'
import { Search } from '../Search/Search'
import { Title } from '../Title/Title'
import './style.css'
import { TaskBar } from '../TaskBar/TaskBar'

export const Box = () => {
    const [textSearch, setTextSearch] = useState("Procurar tarefa");

    return(
        <div className="box">
            <Title text={"Terça-Feira,"} highlight={"24"} postText={"de Julho"}/>

            <Search text={textSearch} />

            <TaskBar />
        </div>
    )
}