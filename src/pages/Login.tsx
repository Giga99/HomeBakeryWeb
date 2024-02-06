import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormInput from "../components/FormInput";

interface FormValues {
    username: string;
    password: string;
}

const Login = () => {
    const [loginError, setLoginError] = useState<boolean>(false);

    const [isAnimated, setIsAnimated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsAnimated(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <section className="h-screen bg-[#F3CFBF] flex items-center justify-center">
            <div
                className={`animated-container flex justify-center items-center ${
                    isAnimated ? "animate-slide-in" : ""
                }`}
            >
                <div className="h-[500px] lg:h-[678px] w-11/12 lg:w-[581px] bg-white p-8 rounded-[16px] text-center">
                    <h1 className="font-['Sansita'] font-[800] text-[35px] lg:text-[46px] text-[#424242] italic mb-10">
                        Welcome
                    </h1>

                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string().required("Username is required"),
                            password: Yup.string()
                                .min(3, "Password must be at least 3 characters")
                                .required("Password is required"),
                        })}
                        onSubmit={(values: FormValues) => {
                            // Retrieve existing logins from localStorage
                            const existingLoginsJSON = localStorage.getItem("bakeryUsers");
                            const existingLogins = existingLoginsJSON
                                ? JSON.parse(existingLoginsJSON)
                                : [];
                            // Check if the submitted credentials match any stored login
                            const matchedLogin = existingLogins.find(
                                (login: FormValues) =>
                                    login.username === values.username &&
                                    login.password === values.password
                            );

                            if (matchedLogin) {
                                // Login successful
                                console.log("Login successful");
                                // Save only the latest successful login to local storage
                                const latestSuccessfulLogin = {
                                    username: values.username,
                                    password: values.password,
                                };

                                localStorage.setItem(
                                    "latestSuccessfulLogin",
                                    JSON.stringify(latestSuccessfulLogin)
                                );

                                if (values.username == "Employee") {
                                    navigate("/orders");
                                } else {
                                    navigate("/cakes");
                                }
                            } else {
                                // Login failed
                                console.log("Login failed");
                                setLoginError(true);
                            }
                        }}
                    >
                        {({errors, touched, isValid}) => (
                            <Form>
                                <div
                                    className="flex flex-col items-center justify-between gap-5 h-[340px] lg:h-[480px]">
                                    <div className="flex flex-col gap-5">
                                        <FormInput
                                            name="username"
                                            type="text"
                                            placeholder="Username"
                                            icon="user"
                                            errors={errors}
                                            touched={touched}
                                            handleKeyDown={() => {
                                                if (loginError) {
                                                    setLoginError(false);
                                                }
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
                                                if (loginError) {
                                                    setLoginError(false);
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {loginError && (
                                            <div
                                                className="flex items-center justify-center gap-2 text-[12px] text-[#EB3223] font-bold">
                                                <img src="static/svg/error.svg" alt=""/>
                                                <span>Incorrect username or password</span>
                                            </div>
                                        )}

                                        <button
                                            className={`${
                                                isValid
                                                    ? "bg-[#F3CFBF] text-[#424242]"
                                                    : "bg-[#A4A2A2]  text-[#FFFDFD]"
                                            }  lg:text-[20px] font-bold flex items-center justify-center w-[328px] h-[56px] px-4 rounded-[20px] outline-none`}
                                            style={{boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)"}}
                                        >
                                            Login
                                        </button>
                                        <span
                                            className="flex items-center justify-center gap-1 text-[#A4A2A2] text-[14px]">
                      <span> New here </span>
                      <Link to="/signup">
                        <span className="underline">Register!</span>
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

export default Login;
