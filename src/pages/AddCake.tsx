import {ChangeEvent, useRef, useState} from "react";
import FormInput from "../components/FormInput";
import {ErrorMessage, Form, Formik} from "formik";
import * as Yup from "yup";
import NavbarEmployee from "../components/layout/NavbarEmployee.tsx";
import cbCake from "../assets/cb-cake.png";
import CakeModel from "../model/CakeModel.ts";

const AddCake = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [ingredientError, setIngredientError] = useState(false);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    // ingredients
    const [ingredient, setIngredient] = useState<string>("");
    const [ingredientsList, setIngredientsList] = useState<string[]>([]);

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIngredient(event.target.value);
        setIngredientError(false);
    };

    const handleCommentSubmit = () => {
        // event.preventDefault();

        if (ingredient.trim() !== "") {
            setIngredientsList([...ingredientsList, ingredient]);
            setIngredient("");
        } else {
            setIngredientError(true);
        }
    };

    return (
        <main className="container">
            <NavbarEmployee/>
            <section className="pb-12">
                <h1 className="text-[#424242] text-[48px] text-center font-bold mb-7">
                    Add New Item
                </h1>
                <div>
                    <Formik
                        initialValues={{
                            name: "",
                            price: "",
                            image: "",
                            description: "",
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Name is required"),
                            price: Yup.string().required("Price is required"),
                            image: Yup.mixed().required("Image is required"),
                            description: Yup.string().required("Description is required"),
                        })}
                        onSubmit={(values, {resetForm}) => {
                            if (ingredientsList.length < 1) {
                                setIngredientError(true);
                                return;
                            }

                            const cakesJSON = localStorage.getItem("cakes");
                            const cakes = cakesJSON ? JSON.parse(cakesJSON) : [];
                            const newCake: CakeModel = {
                                id: cakes.length + 1,
                                name: values.name,
                                description: values.description,
                                price: Number(values.price),
                                img: cbCake,
                                url: values.name,
                                ingredients: ingredientsList.map((ingredient) => ({value: ingredient})),
                                comments: [],
                            };
                            cakes.push(newCake);
                            localStorage.setItem(
                                "cakes",
                                JSON.stringify(cakes)
                            );

                            resetForm();
                            setSelectedImage(null);
                            if (descriptionRef.current) {
                                descriptionRef.current.value = "";
                            }
                            setIngredientsList([]);

                            setPopupVisible(true);
                        }}
                    >
                        {({
                              errors,
                              touched,
                              isValid,
                              dirty,
                              handleChange,
                              handleBlur,
                          }) => (
                            <Form>
                                <div className="flex flex-col mx-auto w-[700px]">
                                    <div className="flex items-center justify-between gap-3 mb-9">
                                        <FormInput
                                            name="name"
                                            type="text"
                                            placeholder="Name of the Cake"
                                            icon="edit"
                                            errors={errors}
                                            touched={touched}
                                            //   handleKeyDown={() => {
                                            //     handleDismissError;
                                            //   }}
                                        />
                                        <FormInput
                                            name="price"
                                            type="text"
                                            placeholder="Price"
                                            icon="euro"
                                            errors={errors}
                                            touched={touched}
                                            inputWidth="w-[140px]"
                                            //   handleKeyDown={() => {
                                            //     handleDismissError;
                                            //   }}
                                        />
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-[300px] h-[300px] flex justify-center items-center rounded-[32px]"
                                                style={{
                                                    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)",
                                                }}
                                            >
                                                {selectedImage ? (
                                                    <img
                                                        src={URL.createObjectURL(selectedImage)}
                                                        alt="Selected Image"
                                                        className="w-full h-full object-cover rounded-[32px]"
                                                    />
                                                ) : (
                                                    <label>
                                                        <img src="static/svg/add.svg" alt=""/>
                                                        <input
                                                            name="image"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const files = e.target.files;
                                                                if (files && files.length > 0) {
                                                                    setSelectedImage(files[0]);
                                                                    handleChange(e);
                                                                }
                                                            }}
                                                            onBlur={handleBlur}
                                                            style={{display: "none"}}
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mt-5">
                                                {errors["image"] && touched["image"] && (
                                                    <img src="static/svg/error.svg" alt=""/>
                                                )}
                                                <ErrorMessage
                                                    name={"image"}
                                                    component="div"
                                                    className="text-[12px] text-[#EB3223] font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="w-[300px] h-[300px] p-6 pl-5 rounded-[32px]"
                                            style={{
                                                boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)",
                                            }}
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="flex gap-3 items-start">
                                                    <img
                                                        src="static/svg/list.svg"
                                                        alt=""
                                                        className="mt-2 -ml-9"
                                                    />
                                                    <textarea
                                                        name="description"
                                                        id="description"
                                                        placeholder="Description"
                                                        className="w-full h-[270px] outline-none text-[#A4A2A2] placeholder:text-[#A4A2A2]"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        ref={descriptionRef}
                                                    ></textarea>
                                                </div>
                                                <div className="flex items-center gap-3 mt-5">
                                                    {errors["description"] && touched["description"] && (
                                                        <img src="static/svg/error.svg" alt=""/>
                                                    )}
                                                    <ErrorMessage
                                                        name={"description"}
                                                        component="div"
                                                        className="text-[12px] text-[#EB3223] font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mt-5">
                                        <h2 className="-ml-[220px] text-[24px] text-[#424242] font-bold mb-3 mt-7 text-left">
                                            Enter ingredients
                                        </h2>
                                        <div
                                            className="h[56px] flex items-center gap-3 p-3 rounded-[20px]"
                                            style={{
                                                boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)",
                                            }}
                                        >
                                            <img src="static/svg/list2.svg" alt=""/>
                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                className="w-[324px] outline-none text-[#A4A2A2] placeholder:text-[#A4A2A2]"
                                                value={ingredient}
                                                onChange={handleCommentChange}
                                            />
                                            <img
                                                src="static/svg/add2.svg"
                                                alt=""
                                                onClick={() => handleCommentSubmit()}
                                                className="cursor-pointer"
                                            />
                                        </div>

                                        {ingredientError && (
                                            <div className="flex items-center gap-3 mt-5 mb-3">
                                                <img src="static/svg/error.svg" alt=""/>
                                                <div className="text-[12px] text-[#EB3223] font-bold">
                                                    Ingredients are needed
                                                </div>
                                            </div>
                                        )}

                                        {ingredientsList.length > 0 && (
                                            <div className="self-start ml-[130px] mb-12 mt-7">
                                                <ul>
                                                    {ingredientsList
                                                        .slice()
                                                        .map((ingredient) => (
                                                            <li>{ingredient}</li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                        <button
                                            className={`${
                                                dirty && isValid && ingredientsList.length > 0
                                                    ? "bg-[#F3CFBF] text-[#424242]"
                                                    : "bg-[#A4A2A2]  text-[#FFFDFD]"
                                            }  lg:text-[20px] font-bold flex items-center justify-center w-[328px] h-[56px] px-4 rounded-[20px] mt-10`}
                                            style={{
                                                boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)",
                                            }}
                                            type="submit"
                                            onClick={() => {
                                                if (ingredientsList.length < 1) {
                                                    setIngredientError(true);
                                                }
                                            }}
                                            // disabled={
                                            //   !Object.values(values).some(Boolean) || isSubmitting
                                            // }
                                        >
                                            Add Item
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>

            {/* Order success popup */}
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0000004D]">
                    <div
                        className="flex flex-col justify-center items-center gap-5 bg-white w-[450px] h-[280px] p-6 rounded-lg shadow-md">
                        <p className="text-[24px]">You successfully added item!</p>
                        <span
                            onClick={() => setPopupVisible(false)}
                            className="bg-[#F3CFBF] w-[166px] h-[79px] cursor-pointer flex items-center justify-center rounded-[20px] shadow-md text-[#424242] text-[32px]"
                        >
              OK
            </span>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AddCake;
