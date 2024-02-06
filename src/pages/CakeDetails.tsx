import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";
import {useParams} from "react-router-dom";
import CakeModel from "../model/CakeModel";
import Comment from "../components/Comment";
import UserModel from "../model/UserModel";
import CartItem from "../model/CartItem.ts";

const CakeDetails = () => {
    const {cakeURL} = useParams<{ cakeURL: string }>();
    const [selectedCake] = useState<CakeModel>(getCakeDetails());
    const [isPopupVisible, setPopupVisible] = useState(false);

    const [userInfo, setUserInfo] = useState({username: ""});

    // comments
    const [comment, setComment] = useState<string>("");
    const [commentsList, setCommentsList] = useState<string[]>([]);

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (comment.trim() !== "") {
            setCommentsList([...commentsList, comment]);
            setComment("");
        }
    };

    // add to cart
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(selectedCake?.price);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(
        () => {
            // Calculate and log totalPrice whenever quantity or selectedCake changes
            let newQuantity = quantity * (selectedCake?.price || 0);
            setTotalPrice(parseFloat(newQuantity.toFixed(2)));
        },
        [quantity]
    );

    const handleAddToCart = (
        name: string,
        price: number,
        quantity: number,
        img: string
    ) => {
        const cakeItem: CartItem = {
            name: name,
            price: price,
            quantity: quantity,
            img: img,
            checked: true,
        };

        // Retrieve existing cart items from localStorage or initialize an empty array
        const existingCartItemsString: string | null =
            localStorage.getItem("cartItems");
        const existingCartItems: CartItem[] = existingCartItemsString
            ? JSON.parse(existingCartItemsString)
            : [];

        // Check if the product already exists in the cart
        const existingProductIndex = existingCartItems.findIndex(
            (item: CartItem) => item.name === cakeItem.name
        );
        console.log(cakeItem);

        if (existingProductIndex !== -1) {
            // If the product already exists, update the quantity
            existingCartItems[existingProductIndex].quantity = quantity;
            existingCartItems[existingProductIndex].price = price;
        } else {
            // If the product does not exist, add it to the cart
            existingCartItems.push(cakeItem);
        }

        // // Save the updated cart items array to localStorage
        localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

        //  Display a confirmation message
        setPopupVisible(true);
        setQuantity(1);
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

    if (!selectedCake) {
        return <p>Cake not found</p>;
    }

    return (
        <main className="container pb-[100px]">
            <NavbarBuyer/>
            <div className="flex flex-col lg:flex-row">
                <div className="lg:flex-[0.5] flex-1">
                    <img
                        src={selectedCake.img}
                        alt=""
                        className="h-[500px]w-full lg:w-[500px]"
                    />
                    <h2 className="text-[#424242] text-[24px] my-5 font-bold">
                        Comments
                    </h2>
                    {commentsList.length > 0 && (
                        <div>
                            <ul>
                                {commentsList
                                    .slice()
                                    .reverse()
                                    .map((comment, index) => (
                                        <Comment
                                            comment={comment}
                                            key={index}
                                            user={userInfo.username}
                                            time="Just Now"
                                        />
                                    ))}
                            </ul>
                        </div>
                    )}
                    <ul>
                        {selectedCake.comments
                            .slice()
                            .reverse()
                            .map((comment) => {
                                return (
                                    <>
                                        <Comment
                                            comment={comment.text}
                                            user={comment.user}
                                            time={comment.time}
                                        />
                                    </>
                                );
                            })}
                    </ul>

                    <form onSubmit={handleCommentSubmit}>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 flex gap-3 items-center p-3 rounded-[20px] w-[380px]">
                                <img src="/static/svg/chat.svg" alt=""/>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Type your comment..."
                                    className="w-full outline-none bg-transparent"
                                />
                            </div>
                            <button type="submit" className="border-0 outline-none">
                                <img src="/static/svg/send.svg" alt=""/>
                            </button>
                        </div>
                    </form>
                </div>

                {totalPrice ? (
                    <div className="lg:flex-[0.5] flex-1 text-[#424242]">
                        <div className="border-b border-[#CACACA] pb-4 px-4 mb-3">
                            <h1 className="text-[#424242] text-[28px] lg:text-[48px] font-bold">
                                {selectedCake.name}
                            </h1>
                            <span className="lg:text-[32px]">
                Price per item {selectedCake.price} €
              </span>
                            <div className="flex items-center gap-3 mt-3 pb-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex items-center justify-center font-bold cursor-pointer ${
                                            quantity > 1 ? "bg-[#F3CFBF]" : "bg-[#CACACA]"
                                        }  text-white h-[22px] w-[22px] rounded-full`}
                                        onClick={handleDecrement}
                                    >
                                        <span className="-mt-[2px]">-</span>
                                    </div>
                                    <span className="font-bold text-[22px]">{quantity}</span>
                                    <div
                                        className="flex items-center justify-center font-bold cursor-pointer bg-[#F3CFBF] text-white h-[22px] w-[22px] rounded-full"
                                        onClick={handleIncrement}
                                    >
                                        <span className="-mt-[2px]">+</span>
                                    </div>
                                </div>
                                <span
                                    onClick={() =>
                                        handleAddToCart(
                                            selectedCake.name,
                                            totalPrice,
                                            quantity,
                                            selectedCake.img
                                        )
                                    }
                                    className="flex items-center justify-center cursor-pointer bg-[#F3CFBF] font-bold lg:w-[208px] w-full h-[45px] rounded-[20px] shadow-md"
                                >
                  Add For {totalPrice} €
                </span>
                            </div>
                        </div>

                        <h2 className="text-[20px] lg:text-[32px] font-bold">
                            Ingredients
                        </h2>
                        <div className="border-b border-[#CACACA] p-4 mb-3">
                            <ul className="ml-8 lg:text-[24px]">
                                {
                                    selectedCake.ingredients
                                        .map((ingredient) => (
                                            <li>{ingredient.value}</li>
                                        ))
                                }
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-[18px] lg:text-[32px] font-bold">
                                Description
                            </h2>
                            <p className="lg:text-[24px]">
                                {selectedCake.description}
                            </p>
                        </div>
                    </div>
                ) : (
                    <span>Loading...</span>
                )}
            </div>

            {/* Success popup */}
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0000004D]">
                    <div
                        className="flex flex-col justify-center items-center gap-5 bg-white w-[450px] h-[280px] p-6 rounded-lg shadow-md">
                        <p className="text-[24px]">You successfully added items to cart!</p>
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

    function getCakeDetails(): CakeModel {
        const cakesJSON = localStorage.getItem("cakes");
        const cakes = cakesJSON ? JSON.parse(cakesJSON) : [];
        return cakes.find((cake: CakeModel) => cake.url === cakeURL)
    }
};

export default CakeDetails;
