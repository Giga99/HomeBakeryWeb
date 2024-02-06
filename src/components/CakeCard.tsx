interface Props {
    img: string;
    name: string;
    description: string;
    featured: boolean;
}

const CakeCard = ({img, name, description, featured}: Props) => {
    return (
        <div className={`flex  ${featured ? "flex-col" : "flex-row  items-center"}`}>
            <img
                src={img}
                alt=""
                className={`${
                    featured ? "w-[380px] h-[382px] " : "w-[310px] h-[302px] "
                } object-cover rounded-t-[15px]`}
            />
            <div className="bg-white p-3">
                <h2 className="text-[#424242] text-[22px]">{name}</h2>
                <span className="text-[#A4A2A2]">{description}</span>
            </div>
        </div>
    );
};

export default CakeCard;
