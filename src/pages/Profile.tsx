import {useEffect, useState} from "react";
import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";

interface UserModel {
    fullname: string;
    username: string;
    phone: string;
    address: string;
}

const Profile = () => {
    //   const [userData, setUserData] = useState(null);
    const [lastUser, setLastUser] = useState<UserModel>();

    useEffect(() => {
        // Retrieve user data from local storage
        const storedUserArray = localStorage.getItem("bakeryUsers");
        const parsedUserArray = storedUserArray ? JSON.parse(storedUserArray) : [];

        // Get the last user from the array
        const lastUserInArray =
            parsedUserArray.length > 0
                ? parsedUserArray[parsedUserArray.length - 1]
                : null;

        setLastUser(lastUserInArray);
    }, []);
    return (
        <main className="container">
            <NavbarBuyer/>
            <section>
                <h1 className="text-[#424242] text-[28px] lg:text-[48px] text-center font-bold mb-8">
                    My Profile
                </h1>

                <div>
                    {lastUser ? (
                        <div className="grid grid-cols-2 gap-8 lg:w-[900px] mx-auto">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[#CACACA] lg:text-[24px]">Full Name:</h2>
                                <span className="text-[#424242] text-[18px] lg:text-[32px]">
                  {lastUser.fullname}
                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[#CACACA] lg:text-[24px]">Username:</h2>
                                <span className="text-[#424242] text-[18px] lg:text-[32px]">
                  {lastUser.username}
                </span>
                            </div>
                            {" "}
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[#CACACA] lg:text-[24px]">Phone Number:</h2>
                                <span className="text-[#424242] text-[18px] lg:text-[32px]">
                  {lastUser.phone}
                </span>
                            </div>
                            {" "}
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[#CACACA] lg:text-[24px]">Address:</h2>
                                <span className="text-[#424242] text-[18px] lg:text-[32px]">
                  {lastUser.address}
                </span>
                            </div>
                        </div>
                    ) : (
                        <p>No user data found. Please log in.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Profile;
