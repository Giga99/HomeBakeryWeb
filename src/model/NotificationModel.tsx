export default interface NotificationModel {
    orderNumber: string;
    status: "accepted" | "declined";
    user: string;
}
