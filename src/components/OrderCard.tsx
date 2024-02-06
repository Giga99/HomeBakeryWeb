import {useEffect, useState} from "react";
import NotificationModel from "../model/NotificationModel";
import useLoggedInUserInfo from "../hooks/useLoggedInUserInfo";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    img: string;
}

interface OrderStatus {
    default: boolean;
    accepted: boolean;
    declined: boolean;
}

interface Order {
    user: string;
    items: OrderItem[];
    orderNumber: string;
    orderStatus: OrderStatus;
}

interface OrderCardProps {
    order: Order;
    onOrderStatusChange: (
        orderNumber: string,
        newOrderStatus: OrderStatus
    ) => void;
}

const OrderCard = ({order, onOrderStatusChange}: OrderCardProps) => {
    const {user, items, orderNumber, orderStatus: initialOrderStatus} = order;
    const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const userInfo = useLoggedInUserInfo();

    const [orderStatus, setOrderStatus] =
        useState<OrderStatus>(initialOrderStatus);

    useEffect(() => {
        // Check if orderStatus has changed before calling onOrderStatusChange
        if (orderStatus !== initialOrderStatus) {
            onOrderStatusChange(orderNumber, orderStatus);
        }
    }, [orderNumber, orderStatus, initialOrderStatus, onOrderStatusChange]);

    // notification
    const handleNotification = (orderNumber: string, status: "accepted" | "declined") => {
        const newNotification: NotificationModel = {
            orderNumber: orderNumber,
            status: status,
            user: userInfo?.username ? userInfo?.username : "",
        };

        const userNotificationsString = localStorage.getItem("userNotifications");
        const userNotifications = userNotificationsString
            ? JSON.parse(userNotificationsString)
            : [];

        const updatedNotifications = [...userNotifications, newNotification];

        localStorage.setItem(
            "userNotifications",
            JSON.stringify(updatedNotifications)
        );
    };

    return (
        <div className="w-[735px] p-6 rounded-[16px] shadow-md">
            <div className="flex justify-between items-center">
                <div className="text-[36px] mb-4">
                    Order {orderNumber} by {user}
                </div>

                {orderStatus.default && (
                    <div className="flex items-center gap-7">
                        <img
                            src="static/svg/check.svg"
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {
                                setOrderStatus({
                                    ...orderStatus,
                                    default: false,
                                    accepted: true,
                                });
                                handleNotification(orderNumber, "accepted");
                            }}
                        />
                        <img
                            src="static/svg/cancel.svg"
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {
                                setOrderStatus({
                                    ...orderStatus,
                                    default: false,
                                    declined: true,
                                });
                                handleNotification(orderNumber, "declined");
                            }}
                        />
                    </div>
                )}

                {orderStatus.accepted && (
                    <span className="text-[#4B8F3A] font-bold">Accepted</span>
                )}
                {orderStatus.declined && (
                    <span className="text-[#EB3223] font-bold">Declined</span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-[24px]"
                    >
                        <span>{item.name}</span>
                        <span>
              {item.quantity} X {item.price} €
            </span>
                    </div>
                ))}
            </div>
            <div
                className="flex justify-between items-center font-bold text-[24px] mt-3 py-2 border-t border-[#A4A2A2]">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
            </div>
        </div>
    );
};

export default OrderCard;
