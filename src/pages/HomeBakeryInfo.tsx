import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";

const HomeBakeryInfo = () => {
    return (
        <main className="container">
            <NavbarBuyer/>
            <section>
                <h1 className="text-[#424242] text-[48px] text-center font-bold mb-5">
                    Home Bakery Info
                </h1>

                <div className="grid grid-cols-3  justify-items-center w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#CACACA] text-[24px]">Name</h2>
                        <span className="text-[#424242] text-[32px]">Home Bakery</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#CACACA] text-[24px]">Phone Number</h2>
                        <span className="text-[#424242] text-[32px]">+381621234567</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#CACACA] text-[24px]">Address</h2>
                        <span className="text-[#424242] text-[32px]">Street 456</span>
                    </div>
                </div>

                <div className="w-[650px] mx-auto mt-14">
                    <h2 className="text-[#CACACA] text-[24px]">Description</h2>

                    <span className="text-[#424242] text-[32px]">
            Indulge in a world where the aroma of freshly baked treats fills the
            air and every bite is a piece of heaven. Home Bakery is your go-to
            app for ordering mouth-watering cakes, cupcakes, and pastries right
            from the comfort of your home.
          </span>
                </div>
            </section>
        </main>
    );
};

export default HomeBakeryInfo;
