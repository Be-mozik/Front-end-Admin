import './Bloc.css'

const Bloc = ({ imageSrc, altText }) => {
    return(
        <div className="bloc-img">
            <img src={imageSrc} alt={altText} />
        </div>
    )
}

export default Bloc