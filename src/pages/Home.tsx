import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        const redirectTimeoutId = setTimeout(() => {
            navigate("/login");
        }, 5000);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(redirectTimeoutId);
        };
    }, [history]);
    return (
        <main
            className={`bg-[#F3CFBF] h-screen flex flex-col items-center justify-center ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            <img
                src="static/svg/logo.svg"
                alt=""
                className={`home-logo ${isVisible ? "fade-in" : ""}`}
            />
        </main>
    );
};

export default Home;
