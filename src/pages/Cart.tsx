import {useEffect, useState} from "react";
import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";
import CakeItem from "../components/CakeItem";
import UserModel from "../model/UserModel";
import CartItem from "../model/CartItem.ts";

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItemDeleted, setCartItemDeleted] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: "",
    });
    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleIncrement = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        updatedCart[index].price =
            (updatedCart[index].price / (updatedCart[index].quantity - 1)) *
            updatedCart[index].quantity;
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleDecrement = (index: number) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            updatedCart[index].price =
                (updatedCart[index].price / (updatedCart[index].quantity + 1)) *
                updatedCart[index].quantity;
            setCartItems(updatedCart);
            updateLocalStorage(updatedCart);
        } else {
            // If quantity is 1, remove the item from the cart
            updatedCart.splice(index, 1);
            updateLocalStorage(updatedCart);
            setCartItemDeleted(!cartItemDeleted);
        }
    };

    const handleToggleChecked = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart[index].checked = !updatedCart[index].checked;
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const updateLocalStorage = (updatedCart: CartItem[]) => {
        // Update localStorage with the updated cart items
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    // Function to calculate the total price of all items in the cart
    const calculateTotalPrice = (): number => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    useEffect(() => {
        // Retrieve the currently logged-in user from localStorage
        const loggedInUserJSON = localStorage.getItem("latestSuccessfulLogin");
        const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;

        if (loggedInUser) {
            // Retrieve additional user information from localStorage
            const existingLoginsJSON = localStorage.getItem("bakeryUsers");
            const existingLogins = existingLoginsJSON
                ? JSON.parse(existingLoginsJSON)
                : [];

            // Find the logged-in user in the existingLogins array
            const userFromStorage = existingLogins.find(
                (login: UserModel) => login.username === loggedInUser.username
            );

            // If user information is found, set it to state
            if (userFromStorage) {
                setUserInfo({
                    username: userFromStorage.username || "",
                });
            }
        }
    }, []);

    useEffect(() => {
        // Retrieve cart items from local storage
        const existingCartItemsString = localStorage.getItem("cartItems");
        const existingCartItems = existingCartItemsString
            ? JSON.parse(existingCartItemsString)
            : [];

        // Set cart items in the component state
        setCartItems(existingCartItems);
    }, [cartItemDeleted]);

    const handleOrder = () => {
        // Filter out checked items and create a new array without them
        const itemsToRemove = cartItems.filter((item) => item.checked);
        const updatedCart = cartItems.filter((item) => !item.checked);

        // Retrieve existing orders from local storage or initialize an empty array
        const existingOrdersString = localStorage.getItem("orders");
        let existingOrders = existingOrdersString
            ? JSON.parse(existingOrdersString)
            : [];

        if (!Array.isArray(existingOrders)) {
            existingOrders = [];
        }

        const orderNumber = Math.floor(10000 + Math.random() * 90000);
        const orderStatus = {
            default: true,
            accepted: false,
            declined: false,
        };
        const newOrder = {
            user: userInfo.username,
            orderNumber: `#${orderNumber}`,
            items: itemsToRemove,
            orderStatus: orderStatus,
        };

        existingOrders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
        setPopupVisible(true);
    };

    // Function to check if any item in the cart is checked
    const isAnyItemChecked = (): boolean => {
        return cartItems.some((item) => item.checked);
    };

    return (
        <main className="container">
            <NavbarBuyer/>
            <section>
                <h1 className="text-[#424242] text-[48px] text-center font-bold mb-7">
                    My Cart
                </h1>

                <div className="w-[500px] mx-auto">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {cartItems.map((item, index) => (
                                <CakeItem
                                    name={item.name}
                                    price={item.price / item.quantity}
                                    quantity={item.quantity}
                                    img={item.img}
                                    checked={item.checked}
                                    handleDecrement={() => handleDecrement(index)}
                                    handleIncrement={() => handleIncrement(index)}
                                    handleToggleChecked={() => handleToggleChecked(index)}
                                    key={index}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between items-center text-[#424242] mt-10">
                        <span>Estimated Total ({totalQuantity} items)</span>
                        {/* <span>Estimated Total ({cartItems.length} items)</span> */}
                        <span>{calculateTotalPrice().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button
                            className={`${
                                isAnyItemChecked()
                                    ? "bg-[#F3CFBF] text-[#424242]"
                                    : "bg-[#A4A2A2]  text-[#FFFDFD]"
                            }  text-[#424242]  lg:text-[20px] font-bold flex items-center justify-center w-[400px] h-[56px] px-4 rounded-[20px]`}
                            style={{boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)"}}
                            onClick={handleOrder}
                            disabled={!isAnyItemChecked()}
                        >
                            Order
                        </button>
                    </div>
                </div>
            </section>

            {/* Order success popup */}
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0000004D]">
                    <div
                        className="flex flex-col justify-center items-center gap-5 bg-white w-[450px] h-[280px] p-6 rounded-lg shadow-md">
                        <p className="text-[24px]">You successfully ordered items!</p>
                        <span
                            onClick={() => setPopupVisible(false)}
                            className="bg-[#F3CFBF] w-[166px] h-[79px] cursor-pointer flex items-center justify-center rounded-[20px] shadow-md text-[#424242] text-[32px]"
                        >
              OK
            </span>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Cart;
