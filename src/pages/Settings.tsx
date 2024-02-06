import {useEffect, useState} from "react";
import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import UserModel from "../model/UserModel";

const Settings = () => {
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
    const [passwordUpdateFailed, setPasswordUpdateFailed] =
        useState<boolean>(false);

    const [activeView, setActiveView] = useState({
        main: true,
        editInfo: false,
        editPassword: false,
    });

    const [userInfo, setUserInfo] = useState({
        fullname: "",
        phone: "",
        address: "",
    });

    interface InfoFormValues {
        fullname: string;
        phone: string;
        address: string;
    }

    interface PasswordFormValues {
        current_password: string;
        new_password: string;
        confirm_password: string;
    }

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
                    fullname: userFromStorage.fullname || "",
                    phone: userFromStorage.phone || "",
                    address: userFromStorage.address || "",
                });
            }
        }
    }, [activeView]);

    return (
        <main className="container">
            <NavbarBuyer/>
            <section>
                <h1 className="text-[#424242] text-[48px] text-center font-bold mb-7">
                    {activeView.main && "Settings"}
                    {activeView.editInfo && "Edit Personal Details"}
                    {activeView.editPassword && "Edit Password"}
                </h1>

                <div className="w-[500px] mx-auto">
                    <>
                        {activeView.main && (
                            <div className="flex flex-col gap-7">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() =>
                                        setActiveView({
                                            ...activeView,
                                            main: false,
                                            editInfo: true,
                                        })
                                    }
                                >
                                    <span className="text-[36px]">Edit Personal Details</span>
                                    <img src="static/svg/arrow-right.svg" alt=""/>
                                </div>
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() =>
                                        setActiveView({
                                            ...activeView,
                                            main: false,
                                            editPassword: true,
                                        })
                                    }
                                >
                                    <span className="text-[36px]">Edit Password</span>
                                    <img src="static/svg/arrow-right.svg" alt=""/>
                                </div>
                            </div>
                        )}
                    </>
                    <>
                        {activeView.editInfo && userInfo && (
                            <div>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        fullname: userInfo.fullname,
                                        phone: userInfo.phone,
                                        address: userInfo.address,
                                    }}
                                    validationSchema={Yup.object({
                                        fullname: Yup.string().required("Full name is required"),
                                        phone: Yup.string().required("Phone is required"),
                                        address: Yup.string().required("Address is required"),
                                    })}
                                    onSubmit={(values: InfoFormValues, {setSubmitting}) => {
                                        // Retrieve the currently logged-in user from localStorage
                                        const loggedInUserJSON = localStorage.getItem(
                                            "latestSuccessfulLogin"
                                        );
                                        const loggedInUser = loggedInUserJSON
                                            ? JSON.parse(loggedInUserJSON)
                                            : null;

                                        if (loggedInUser) {
                                            // Retrieve existing user information from localStorage
                                            const existingLoginsJSON =
                                                localStorage.getItem("bakeryUsers");
                                            const existingLogins = existingLoginsJSON
                                                ? JSON.parse(existingLoginsJSON)
                                                : [];

                                            // Find the logged-in user in the existingLogins array
                                            const updatedLogins = existingLogins.map(
                                                (login: UserModel) =>
                                                    login.username === loggedInUser.username
                                                        ? {...login, ...values}
                                                        : login
                                            );

                                            // Save the updated user information to localStorage
                                            localStorage.setItem(
                                                "bakeryUsers",
                                                JSON.stringify(updatedLogins)
                                            );

                                            setUpdateSuccess(true);
                                            setTimeout(() => {
                                                setUpdateSuccess(false);
                                                setActiveView({
                                                    ...activeView,
                                                    main: true,
                                                    editInfo: false,
                                                });
                                            }, 1000);
                                        } else {
                                            // Handle the case where there is no logged-in user
                                            console.log("No logged-in user found");
                                        }
                                        setSubmitting(false);
                                    }}
                                >
                                    {({errors, touched, isValid}) => (
                                        <Form>
                                            <div
                                                className="flex flex-col items-center justify-between gap-5 h-full lg:h-[340px]">
                                                <div className="flex flex-col gap-5">
                                                    <FormInput
                                                        name="fullname"
                                                        type="text"
                                                        placeholder="Full Name"
                                                        icon="edit"
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                    <FormInput
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        icon="phone"
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                    <FormInput
                                                        name="address"
                                                        type="text"
                                                        placeholder="Address"
                                                        icon="home"
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                </div>

                                                {updateSuccess && (
                                                    <div
                                                        className="flex items-center justify-center gap-2 text-[12px] text-[#497d26] font-bold">
                                                        <span>Changes were saved successfully</span>
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        className={`${
                                                            isValid
                                                                ? "bg-[#F3CFBF] text-[#424242]"
                                                                : "bg-[#A4A2A2]  text-[#FFFDFD]"
                                                        }  lg:text-[20px] font-bold flex items-center justify-center w-[328px] h-[56px] px-4 rounded-[20px]`}
                                                        style={{
                                                            boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)",
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        )}
                    </>
                    <>
                        {activeView.editPassword && userInfo && (
                            <div>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        current_password: "",
                                        new_password: "",
                                        confirm_password: "",
                                    }}
                                    validationSchema={Yup.object({
                                        current_password: Yup.string().required(
                                            "Current password is required"
                                        ),
                                        new_password: Yup.string()
                                            .min(3, "Password must be at least 3 characters")
                                            .required("New password is required"),
                                        confirm_password: Yup.string().oneOf(
                                            [Yup.ref("new_password")!, undefined],
                                            "Passwords must match"
                                        ),
                                    })}
                                    onSubmit={(values: PasswordFormValues, {setSubmitting}) => {
                                        // Retrieve the currently logged-in user from localStorage
                                        const loggedInUserJSON = localStorage.getItem(
                                            "latestSuccessfulLogin"
                                        );
                                        const loggedInUser = loggedInUserJSON
                                            ? JSON.parse(loggedInUserJSON)
                                            : null;

                                        if (loggedInUser) {
                                            // Retrieve existing user information from localStorage
                                            const existingLoginsJSON =
                                                localStorage.getItem("bakeryUsers");
                                            const existingLogins = existingLoginsJSON
                                                ? JSON.parse(existingLoginsJSON)
                                                : [];

                                            // Find the logged-in user in the existingLogins array
                                            const userToUpdateIndex = existingLogins.findIndex(
                                                (user: UserModel) =>
                                                    user.username === loggedInUser.username
                                            );

                                            if (userToUpdateIndex !== -1) {
                                                // Check if the current password matches the stored password
                                                if (
                                                    existingLogins[userToUpdateIndex].password ===
                                                    values.current_password
                                                ) {
                                                    // Update the user's password
                                                    existingLogins[userToUpdateIndex].password =
                                                        values.new_password;

                                                    // Save the updated user information to localStorage
                                                    localStorage.setItem(
                                                        "bakeryUsers",
                                                        JSON.stringify(existingLogins)
                                                    );

                                                    // Handle any additional logic, such as displaying a success message or redirecting to another page
                                                    console.log("Password updated successfully!");
                                                    setUpdateSuccess(true);
                                                    setTimeout(() => {
                                                        setUpdateSuccess(false);
                                                        setActiveView({
                                                            ...activeView,
                                                            main: true,
                                                            editPassword: false,
                                                        });
                                                    }, 1000);
                                                } else {
                                                    // Handle incorrect current password
                                                    console.log("Incorrect current password");
                                                    setPasswordUpdateFailed(true);
                                                }
                                            } else {
                                                // Handle the case where the user is not found
                                                console.log("User not found");
                                            }
                                        } else {
                                            // Handle the case where there is no logged-in user
                                            console.log("No logged-in user found");
                                        }

                                        // Reset the form and set submitting to false
                                        setSubmitting(false);
                                    }}
                                >
                                    {({errors, touched, isValid}) => (
                                        <Form>
                                            <div
                                                className="flex flex-col items-center justify-between gap-5 h-full lg:h-[340px]">
                                                <div className="flex flex-col gap-5">
                                                    <FormInput
                                                        name="current_password"
                                                        type="password"
                                                        placeholder="Old Password"
                                                        icon="lock"
                                                        errors={errors}
                                                        touched={touched}
                                                        handleKeyDown={() => {
                                                            setPasswordUpdateFailed(false);
                                                        }}
                                                    />
                                                    <FormInput
                                                        name="new_password"
                                                        type="password"
                                                        placeholder="New Password"
                                                        icon="lock"
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                    <FormInput
                                                        name="confirm_password"
                                                        type="password"
                                                        placeholder="Confirm New Password"
                                                        icon="lock"
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                </div>

                                                {updateSuccess && (
                                                    <div
                                                        className="flex items-center justify-center gap-2 text-[12px] text-[#497d26] font-bold">
                                                        <span>Changes were saved successfully!</span>
                                                    </div>
                                                )}
                                                {passwordUpdateFailed && (
                                                    <div
                                                        className="flex items-center justify-center gap-2 text-[12px] text-[#EB3223] font-bold">
                                                        <img src="static/svg/error.svg" alt=""/>
                                                        <span>Current password is not correct!</span>
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        className={`${
                                                            isValid
                                                                ? "bg-[#F3CFBF] text-[#424242]"
                                                                : "bg-[#A4A2A2]  text-[#FFFDFD]"
                                                        }  lg:text-[20px] font-bold flex items-center justify-center w-[328px] h-[56px] px-4 rounded-[20px]`}
                                                        style={{
                                                            boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)",
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        )}
                    </>
                </div>
            </section>
        </main>
    );
};

export default Settings;
