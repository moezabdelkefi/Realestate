
import React from "react";
import { useParams } from "react-router-dom";
import { property } from "../data/dummyData";
import { BiBed , BiBath , BiArea } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import {Featured} from "../components/common/page-componets";

const PropertyDetails = () => {
    const { id } = useParams();
    const house = property.find((house) => {
        return house.id === parseInt(id);
    });

    return (
        <><div className="pt-20 px-[3%] md:px-[6%]">
            {house ? (
                <>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="font-semibold text-lg">{house.name}</h1>
                            <p className="text-lg mb-4">{house.location}</p>
                        </div>
                        <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
                            <div className="bg-green-500 text-white px-7 rounded-full text-base font-semibold">
                                {house.purpose}
                            </div>
                            <p className="text-base font-semibold text-violet-600">{house.price} $</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-8 lg:flex-row w-11/12">
                        <div className="max-w-[768px]">
                            <div className="mb-8">
                                <img src={house.image} />
                            </div>
                            <div className="flex gap-x-6 text-violet-700 mb-6">
                                <div className="flex gap-x-2 items-center">
                                    <BiBed className="text-2x1" />
                                    <p>{house.number_of_beds}</p>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <BiBath className="text-2x1" />
                                    <p>{house.number_of_bathrooms}</p>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <BiArea className="text-2x1" />
                                    <p>{house.dimensions}</p>
                                </div>
                            </div>
                            <div>{house.description}</div>
                        </div>
                        <div className="flex-1 border w-full mb-8 rounded-lg px-6 py-8">
                            <div className="flex items-center gap-x-4">
                                <h1>Make an appointment</h1>
                                {/* <div className="rounded-md overflow-hidden w-20 h-20">
                                    <img src={house.agent.image} alt={`Agent ${house.agent.name}`} />
                                </div> */}
                                <div>
                                    {/* <div className="font-bold text-lg"> {house.agent.name} </div> */}
                                    <div className="flex gap-x-2 items-center">
                                       {/* <p>{house.agent.rating}</p>  */}
                                    {/* <FaStar className="text-yellow-500 ml-1" /> */}
                                    </div>
                                    {/* <Link to={'/AgentList'} className="text-violet-700 text-sm">View Listings</Link> */}
                                </div>
                            </div>
                            <br />
                            <form className="flex flex-col gap-y-4">
                                <input className="border rounded w-full px-2 h-10 p-4 text-sm bg-inherit focus:border-violet-700" type="text" placeholder="Name" />
                                <input className="border rounded w-full px-2 p-4 h-10 text-sm bg-inherit focus:border-violet-700" type="text" placeholder="Email" />
                                {/* <input className="border rounded w-full px-2 p-4 h-10 bg-inherit focus:border-violet-700" type="text" placeholder="Phone" /> */}
                                <textarea className="border rounded w-full p-4 px-2 h-40 text-sm bg-inherit focus:border-violet-700" placeholder="Message" />
                                <div className="flex gap-x-2">
                                    <button className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition ">Send message</button>
                                    {/* <button className="border border-violet-500 text-violet-800 hover:border-violet-500 hover:text-violet-500 rounded p-4 text-sm w-full transition">Call</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <p>Property not found</p>
            )}
        </div>
        <div className="px-[3%] md:px-[6%]"><Featured /></div></> 
    );
};

export default PropertyDetails;