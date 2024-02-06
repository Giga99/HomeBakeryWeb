import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const NavbarBuyer = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Clear information from localStorage
        localStorage.removeItem("latestSuccessfulLogin");
        navigate("/login");
    };

    return (
        <nav className="relative flex justify-between items-center h-[150px]">
            <h1 className="font-['Sansita'] font-[800] text-[35px] lg:text-[50px] text-[#424242] italic mb-10">
                <Link to="/cakes">Home Bakery</Link>
            </h1>

            <img
                src="/static/svg/user2.svg"
                alt=""
                onClick={toggleMenu}
                className="cursor-pointer"
            />
            {isMenuOpen && (
                <div
                    className="flex flex-col gap-5 absolute top-[100px] right-0 px-6 py-7 w-[308px] h-[350px] bg-[#ffffff] text-[20px] shadow-md z-50">
                    <Link to="/profile" className="flex items-center gap-2">
                        <img src="static/svg/user3.svg" alt="" className="h-8"/>
                        <span>My Profile</span>
                    </Link>
                    <Link to="/bakery-info" className="flex items-center gap-2">
                        <img src="static/svg/info.svg" alt="" className="h-8"/>
                        <span>Home Bakery Info</span>
                    </Link>
                    <Link to="/notifications" className="flex items-center gap-2">
                        <img src="static/svg/bell.svg" alt="" className="h-8"/>
                        <span>Notifications</span>
                    </Link>
                    <Link to="/cart" className="flex items-center gap-2">
                        <img src="static/svg/cart.svg" alt="" className="h-8"/>
                        <span>Cart</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2">
                        <img src="static/svg/settings.svg" alt="" className="h-8"/>
                        <span>Settings</span>
                    </Link>
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                            setIsMenuOpen(false);
                            setIsLogoutMenuOpen(true);
                        }}
                    >
                        <img src="static/svg/logout.svg" alt="" className="h-8"/>
                        <span>Logout</span>
                    </div>
                </div>
            )}

            {isLogoutMenuOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0000004D]">
                    <div
                        className="flex flex-col justify-center items-center gap-4 bg-white w-[602px] h-[361px] p-6 rounded-lg shadow-md">
                        <p className="text-[30px]">Are you sure you want to log out?</p>
                        <span
                            onClick={handleLogout}
                            className="bg-[#EB3223] w-[328px] h-[55px] cursor-pointer flex items-center justify-center rounded-[20px] shadow-md text-[#ffffff] text-[20px]"
                        >
              Logout
            </span>
                        <span
                            onClick={() => setIsLogoutMenuOpen(false)}
                            className="bg-[#A4A2A2] w-[328px] h-[55px] cursor-pointer flex items-center justify-center rounded-[20px] shadow-md text-[#ffffff] text-[20px]"
                        >
              Cancel
            </span>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarBuyer;
