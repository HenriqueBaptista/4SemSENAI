import './style.css'

export const Title = ({
    text,
    highlight,
    postText
}) => {
    return (
        <p className="title">{text} <span className="highlight">{highlight}</span> {postText}</p>
    )
}