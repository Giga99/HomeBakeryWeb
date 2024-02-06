import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormInput from "../components/FormInput";

interface FormValues {
    fullname: string;
    username: string;
    phone: string;
    address: string;
    password: string;
    re_password: string;
}

const Signup = () => {
    const [savedUsers, setSavedUsers] = useState<FormValues[]>([]);
    const [signupError, setSignupError] = useState<boolean>(false);

    const [isAnimated, setIsAnimated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsAnimated(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleDismissError = () => {
        if (signupError) {
            setSignupError(false);
        }
    };

    return (
        <section className="h-full py-[100px] bg-[#F3CFBF] flex items-center justify-center">
            <div
                className={`animated-container flex justify-center items-center ${
                    isAnimated ? "animate-slide-in" : ""
                }`}
            >
                <div
                    className="h-[1100px] lg:h-[830px] w-11/12 lg:w-[581px] bg-white p-8 rounded-[16px] text-center pb-[40px]">
                    <h1 className="font-['Sansita'] font-[800] text-[35px] lg:text-[46px] text-[#424242] italic mb-10">
                        Welcome
                    </h1>

                    <Formik
                        initialValues={{
                            fullname: "",
                            username: "",
                            phone: "",
                            address: "",
                            password: "",
                            re_password: "",
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string().required("Username is required"),
                            fullname: Yup.string().required("Full name is required"),
                            password: Yup.string()
                                .min(3, "Password must be at least 3 characters")
                                .required("Password is required"),
                            re_password: Yup.string()
                                .oneOf(
                                    [Yup.ref("password")!, undefined],
                                    "Passwords must match"
                                )
                                .required("Confirm Password is required"),
                        })}
                        onSubmit={(values: FormValues) => {
                            // Retrieve existing users from localStorage
                            const existingUsersJSON = localStorage.getItem("bakeryUsers");
                            const existingUsers = existingUsersJSON
                                ? JSON.parse(existingUsersJSON)
                                : [];

                            // Check if the entered username already exists
                            const isUserExists = existingUsers.some(
                                (user: FormValues) => user.username === values.username
                            );

                            if (isUserExists) {
                                console.error("User with this username already exists");
                                setSignupError(true);
                                // setTimeout(() => {
                                //   setSignupError(false);
                                // }, 3000);
                            } else {
                                // Ensure existingUsers is an array
                                const updatedUsers = Array.isArray(existingUsers)
                                    ? [...existingUsers, values]
                                    : [values];

                                // Save the updated list to localStorage
                                localStorage.setItem(
                                    "bakeryUsers",
                                    JSON.stringify(updatedUsers)
                                );

                                // Save the updated list to localStorage
                                localStorage.setItem(
                                    "bakeryUsers",
                                    JSON.stringify(updatedUsers)
                                );

                                setSavedUsers(updatedUsers);
                                navigate("/cakes");
                            }
                        }}
                    >
                        {({errors, touched, isValid}) => (
                            <Form>
                                <div className="flex flex-col items-center justify-between gap-5 h-full lg:h-[480px]">
                                    <div className="flex flex-col gap-5">
                                        <FormInput
                                            name="fullname"
                                            type="text"
                                            placeholder="Full Name"
                                            icon="edit"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                handleDismissError;
                                            }}
                                        />
                                        <FormInput
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            icon="phone"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                handleDismissError;
                                            }}
                                        />
                                        <FormInput
                                            name="address"
                                            type="text"
                                            placeholder="Address"
                                            icon="home"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                handleDismissError;
                                            }}
                                        />
                                        <FormInput
                                            name="username"
                                            type="text"
                                            placeholder="Username"
                                            icon="user"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                handleDismissError;
                                            }}
                                        />
                                        <FormInput
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            icon="lock"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                handleDismissError;
                                            }}
                                        />
                                        <FormInput
                                            name="re_password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            icon="lock"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                handleDismissError;
                                            }}
                                        />
                                    </div>

                                    {signupError && (
                                        <div
                                            className="flex items-center justify-center gap-2 text-[12px] text-[#EB3223] font-bold">
                                            <img src="static/svg/error.svg" alt=""/>
                                            <span>Username not available!</span>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        <button
                                            className={`${
                                                isValid
                                                    ? "bg-[#F3CFBF] text-[#424242]"
                                                    : "bg-[#A4A2A2]  text-[#FFFDFD]"
                                            }  lg:text-[20px] font-bold flex items-center justify-center w-[328px] h-[56px] px-4 rounded-[20px]`}
                                            style={{boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)"}}
                                        >
                                            Register
                                        </button>
                                        <span
                                            className="flex items-center justify-center gap-1 text-[#A4A2A2] text-[14px]">
                      <span> New here </span>
                      <Link to="/login">
                        <span className="underline">Login!</span>
                      </Link>
                    </span>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default Signup;
