import {ErrorMessage, Field} from "formik";

interface FormInputProps {
    name: string;
    type: string;
    placeholder: string;
    icon?: string;
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
    handleKeyDown?: () => void;
    inputWidth?: string;
}

const FormInput: React.FC<FormInputProps> = (
    {
        name,
        type,
        placeholder,
        icon,
        errors,
        touched,
        handleKeyDown,
        inputWidth,
    }
) => {
    return (
        <div className={`flex flex-col items-start`}>
            <div
                className={`flex items-center ${
                    inputWidth ? inputWidth : "w-[328px]"
                }  h-[56px] px-4 rounded-[20px] ${
                    errors[name] && touched[name]
                        ? "border border-[#EB3223]"
                        : "border-gray-300"
                } `}
                style={{boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2)"}}
            >
                <div className="flex items-center gap-3 w-full">
                    {icon && <img src={`static/svg/${icon}.svg`} alt=""/>}
                    <Field
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className="w-full outline-none font-[600] text-[#A4A2A2]"
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
                {errors[name] && touched[name] && (
                    <img src="static/svg/error.svg" alt=""/>
                )}
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-[12px] text-[#EB3223] font-bold"
                />
            </div>
        </div>
    );
};

export default FormInput;
