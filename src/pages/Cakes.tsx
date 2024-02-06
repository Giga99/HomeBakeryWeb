import {useEffect, useState} from "react";
import CakeCard from "../components/CakeCard";
import NavbarBuyer from "../components/layout/NavbarBuyer.tsx";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {AutoScroll} from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import CakeModel from "../model/CakeModel";
import {Link} from "react-router-dom";

const Cakes = () => {
    const [cakesData, setCakes] = useState<CakeModel[]>([]);

    useEffect(
        () => {
            const cakesJSON = localStorage.getItem("cakes");
            const cakes = cakesJSON ? JSON.parse(cakesJSON) : [];
            setCakes(cakes);
        },
        []
    );

    return (
        <main className="container pb-[100px]">
            <NavbarBuyer/>

            <section>
                <h1 className="text-[#424242] text-[33px] mb-5">Promotions</h1>

                <Splide
                    options={{
                        type: "loop",
                        drag: "free",
                        pagination: false,
                        arrows: false,
                        gap: "30px",
                        autoWidth: true,
                        // focus: "center",
                        perPage: 1,
                        perMove: 1,
                        autoScroll: {
                            pauseOnHover: true,
                            pauseOnFocus: true,
                            rewind: false,
                            speed: 1,
                        },
                    }}
                    aria-label="Actors and casting directors"
                    extensions={{AutoScroll}}
                >
                    {cakesData.slice(0, 3).map((cake) => (
                        <SplideSlide key={cake.id}>
                            <Link to={`/cake-details/${cake.url}`}>
                                <CakeCard
                                    img={cake.img}
                                    name={cake.name}
                                    description={cake.description}
                                    featured={true}
                                />
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>

                <div className="flex flex-col gap-10 mt-[70px]">
                    <h1 className="text-[#424242] text-[33px] mb-5">Menu</h1>

                    {cakesData.map((cake) => (
                        <Link to={`/cake-details/${cake.url}`}>
                            <CakeCard
                                img={cake.img}
                                name={cake.name}
                                description={cake.description}
                                featured={false}
                                key={cake.id}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Cakes;
