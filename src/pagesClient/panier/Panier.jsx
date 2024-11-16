import './Panier.css'
import NavHeader from '../../componentsClient/nav_header/NavHeader';
import FooterClient from '../../componentsClient/footer/FooterClient';
import { FiTrash } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import achatApi from '../../api/achatApi';
import clientApi from '../../api/clientApi';



const Panier = () => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const handleDeco = async () => {
        try {
            await clientApi.deconnexionClient();
            navigate('/Connexion');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchClientProfile = async () => {
            try {
                const token = 'tokenClient';
                const decoded = await clientApi.getProfileClient(token);
                if (decoded) {                    
                    setUser(decoded);
                } else {
                    console.log('Token non trouvé');
                    await handleDeco();
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchClientProfile();
    }, []);

    useEffect(() => {
        const fetchCartItems = () => {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(existingCart);
        };
        fetchCartItems();
    }, []);

    const removeItemFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const calculateTotalPriceAndCurrency = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currencies = new Set();
        const totalAmount = existingCart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const currency = item.currency || "";
            if (currency) {
                currencies.add(currency);
            }
            return total + price;
        }, 0);
        
        return { totalAmount, currency: currencies.size > 0 ? Array.from(currencies)[0] : '' };
    };
    const { totalAmount, currency } = calculateTotalPriceAndCurrency();

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const handleCheckOut = async () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart'));
            if(cart.length ===0){
                alert('Votre panier est vide');
                return;
            }
            for(const item of cart){
                const data= {
                    idclient: user.idclient,
                    idevenement: item.eventId,
                    idbillet: item.billetId,
                    nombre: item.quantity
                }
                try {
                    const response = await achatApi.achatBillet(data);
                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    const contentDisposition = response.headers['content-disposition'];
                    let filename = `${item.eventName}-${item.billetName}.pdf`;
                    if (contentDisposition) {
                        const match = contentDisposition.match(/filename="(.+)"/);
                        if (match && match[1]) {
                            filename = match[1];
                        }
                    }
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.log(error);
                    console.error(`Échec de l'achat pour ${item.eventName} - ${item.billetName}`);
                }
            }
            localStorage.removeItem('cart');
            navigate('/Merci');
        } catch (error) {
            console.error("Erreur générale :", error.message);
            alert("Une erreur s'est produite lors du processus de paiement.");
        }
    }

    return(
        <>
            <div className="container-panier">
            <NavHeader/>
                <div className="content-panier">
                    <div className="titre-panier">
                        <h1>Mon panier</h1>
                        <p>Vos achats seront affichés ici.</p>
                    </div>
                    <div className="tableau-panier">
                        <div className="list-achat">
                        <table className="ticket-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Nom du billet</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                               {cartItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.eventName}</td>
                                    <td>{item.billetName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{`${item.price} ${item.currency}`}</td>
                                    <td>
                                        <FiTrash onClick={() => removeItemFromCart(index)} className="trash-icon" />
                                    </td>
                                </tr>
                            ))}
                            {cartItems.length === 0 && (
                                <tr>
                                    <td colSpan="5">Votre panier est vide.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                        <div className="amount">
                            <h1>SUMMARY</h1>
                            <div className="total-article">
                                <p>Total article</p>
                                <p>{formatAmount(totalAmount)} {currency}</p>
                            </div>
                            <hr />
                            <div className="checkout">
                                <div className="checkout-item">
                                    <input type="radio" name="billet" id="mvola" />
                                    <label htmlFor="mvola">
                                        <span>MVola</span>
                                    </label>

                                    <input type="radio" name="billet" id="orange" />
                                    <label htmlFor="orange">
                                        <span>Orange Money</span>
                                    </label>

                                    <input type="radio" name="billet" id="airtel" />
                                    <label htmlFor="airtel">
                                        <span>Airtel Money</span>
                                    </label>

                                    <input type="radio" name="billet" id="sumup" />
                                    <label htmlFor="sumup">
                                        <span>SumUp</span>
                                    </label>
                                </div>
                            </div>
                            <button className="passer-caisse" onClick={handleCheckOut}>Passer à la caisse</button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterClient/>
        </>
    )   
}

export default Panier;