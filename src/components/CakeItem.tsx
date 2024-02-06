interface Props {
    name: string;
    quantity: number;
    price: number;
    img: string;
    handleIncrement: () => void;
    handleDecrement: () => void;
    handleToggleChecked: () => void;
    checked: boolean;
}

const CakeItem = (
    {
        name,
        price,
        quantity,
        img,
        handleIncrement,
        handleDecrement,
        handleToggleChecked,
        checked,
    }: Props
) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <div onClick={handleToggleChecked}>
                    {checked ? (
                        <img src="/static/svg/box-checked.svg" alt="" className="h-9"/>
                    ) : (
                        <img src="/static/svg/box-unchecked.svg" alt="" className="h-9"/>
                    )}
                </div>
                <img src={img} alt="" className="h-[100px] w-[100px]"/>
                <div className="flex flex-col">
                    <span className="text-[#424242]  text-[24px]">{name}</span>
                    <span className="text-[#A4A2A2]">{price} €</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div
                    className={`flex items-center justify-center font-bold cursor-pointer ${
                        quantity > 1 ? "bg-[#CACACA]" : ""
                    }  text-white h-[22px] w-[22px] rounded-full`}
                    onClick={handleDecrement}
                >
                    {quantity > 1 ? (
                        <span className="-mt-[2px]">-</span>
                    ) : (
                        <img src="static/svg/bin.svg" alt="" onClick={handleDecrement}/>
                    )}
                </div>
                <span className="font-bold text-[22px]">{quantity}</span>
                <div
                    className="flex items-center justify-center font-bold cursor-pointer bg-[#F3CFBF] text-white h-[22px] w-[22px] rounded-full"
                    onClick={handleIncrement}
                >
                    <span className="-mt-[2px]">+</span>
                </div>
            </div>
        </div>
    );
};

export default CakeItem;
