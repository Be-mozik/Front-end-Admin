import './Bloc.css';
import { Link } from 'react-router-dom';

const Bloc = ({ imageSrc, altText, idevenement }) => {
    return (
        <div className="bloc-img">
            {idevenement ? (
                <Link to={`/Evenement/${idevenement}`} className="bloc-link">
                    <img src={imageSrc} alt={altText} />
                </Link>
            ) : (
                <img src={imageSrc} alt={altText} />
            )}
        </div>
    );
};

export default Bloc;
