import {useEffect, useState} from "react";
import OrderCard from "../components/OrderCard";
import NavbarEmployee from "../components/layout/NavbarEmployee.tsx";

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

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Retrieve orders from local storage
        const ordersString = localStorage.getItem("orders");
        const ordersData = ordersString ? JSON.parse(ordersString) : [];
        setOrders(ordersData);
    }, []);

    const handleOrderStatusChange = (
        orderNumber: string,
        newOrderStatus: OrderStatus,
        user: string
    ) => {
        // Update the order status in the local state
        setOrders((prevOrders: Order[]) =>
            prevOrders.map((order) =>
                order.orderNumber === orderNumber
                    ? {...order, orderStatus: newOrderStatus}
                    : order
            )
        );

        // Update the order status in local storage
        const updatedOrders = orders.map((order) =>
            order.orderNumber === orderNumber
                ? {...order, orderStatus: newOrderStatus}
                : order
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        const userNotificationsString = localStorage.getItem("userNotifications");
        const userNotifications = userNotificationsString
            ? JSON.parse(userNotificationsString)
            : [];
        userNotifications.push({
            "orderNumber": orderNumber,
            "status": newOrderStatus,
            "user": user
        });
        localStorage.setItem("userNotifications", userNotifications);
    };

    return (
        <main className="container">
            <NavbarEmployee/>
            <section>
                <h1 className="text-[#424242] text-[48px] text-center font-bold mb-7">
                    New Orders
                </h1>

                <div className="w-[735px] mx-auto text-[#424242]">
                    {orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            order={order}
                            onOrderStatusChange={handleOrderStatusChange}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Orders;
