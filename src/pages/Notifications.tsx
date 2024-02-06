import {useEffect, useState} from "react";
import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";
import NotificationModel from "../model/NotificationModel";
import useLoggedInUserInfo from "../hooks/useLoggedInUserInfo";

const Notifications = () => {
    const [notifications, setNotifications] = useState<NotificationModel[]>([]);
    // const [userInfo, setUserInfo] = useState({
    //   username: "",
    // });

    const userInfo = useLoggedInUserInfo();

    useEffect(() => {
        // Retrieve notifications from local storage for the logged-in user
        const userNotificationsString = localStorage.getItem("userNotifications");
        const userNotifications = userNotificationsString
            ? JSON.parse(userNotificationsString)
            : [];

        // Filter notifications for the logged-in user
        const userSpecificNotifications = userNotifications.filter(
            (notification: NotificationModel) =>
                notification.user === userInfo?.username
        );

        setNotifications(userSpecificNotifications);
    }, [userInfo?.username]);

    return (
        <main className="container">
            <NavbarBuyer/>
            <section>
                <h1 className="text-[#424242] text-[48px] text-center font-bold mb-7">
                    My Notifications
                </h1>

                <div className="flex flex-col items-center gap-3">
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className={`w-fit ${
                                notification.status === "accepted"
                                    ? "text-[#424242]"
                                    : "text-[#EB322380]"
                            } text-[34px] border-b border-[#CACACA]`}
                        >
                            Your order {notification.orderNumber} is {notification.status}.
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Notifications;
