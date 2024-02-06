import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cakes from "./pages/Cakes";
import HomeBakeryInfo from "./pages/HomeBakeryInfo";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import CakeDetails from "./pages/CakeDetails";
import Settings from "./pages/Settings";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AddCake from "./pages/AddCake";
import UserModel from "./model/UserModel.ts";
import data from "./data/cakes.ts";

function App() {
    const existingUsersJSON = localStorage.getItem("bakeryUsers");
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    if (existingUsers.filter((user: UserModel) => user.username === 'Employee').length == 0) {
        existingUsers.push(
            {
                "fullName": "Employee",
                "phoneNumber": "+381621234567",
                "address": "Street123",
                "username": "Employee",
                "password": "123",
            }
        )
        localStorage.setItem(
            "bakeryUsers",
            JSON.stringify(existingUsers)
        );
    }
    const cakesJSON = localStorage.getItem("cakes");
    let cakes = cakesJSON ? JSON.parse(cakesJSON) : [];

    if (cakes.length == 0) {
        cakes = [...data]
        localStorage.setItem(
            "cakes",
            JSON.stringify(cakes)
        );
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/cakes" element={<Cakes/>}/>
                    <Route path="/cake-details/:cakeURL/" element={<CakeDetails/>}/>
                    <Route path="/bakery-info" element={<HomeBakeryInfo/>}/>
                    <Route path="/notifications" element={<Notifications/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/add-cake" element={<AddCake/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
