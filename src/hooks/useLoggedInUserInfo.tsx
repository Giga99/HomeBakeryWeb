import {useEffect, useState} from "react";

interface UserModel {
    username: string;
    // Add any other relevant information
}

const useLoggedInUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserModel | null>(null);

    useEffect(() => {
        const loggedInUserJSON = localStorage.getItem("latestSuccessfulLogin");
        const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;

        if (loggedInUser) {
            const existingLoginsJSON = localStorage.getItem("bakeryUsers");
            const existingLogins = existingLoginsJSON
                ? JSON.parse(existingLoginsJSON)
                : [];

            const userFromStorage = existingLogins.find(
                (login: UserModel) => login.username === loggedInUser.username
            );

            if (userFromStorage) {
                setUserInfo({
                    username: userFromStorage.username || "",
                    // Add any other relevant information
                });
            }
        }
    }, []);

    return userInfo;
};

export default useLoggedInUserInfo;
