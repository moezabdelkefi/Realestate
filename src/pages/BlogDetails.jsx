import React from "react";
import { useParams } from "react-router-dom";
import { feeds } from "../data/dummyData";
import { BiBed , BiBath , BiArea} from "react-icons/bi";
import { Link } from "react-router-dom";
import { BlogPostsList} from "../components/common/page-componets";


const BlogDetails = () => {
    const { id } = useParams();
    console.log("ID from URL:", id);
    const blog = feeds.find((blog) => {
        return blog.id === parseInt(id);
    });

    return (
        <><div className="pt-20 px-[3%] md:px-[6%]">
            {blog ? (
                <>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-semibold">{blog.title}</h2>
                            <p className="text-lg mb-4">{blog.date_posted}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-8 lg:flex-row">
                        <div className="max-w-[900px]">
                            <div className="mb-6"> {/* Ajout de la classe de marge en bas */}
                                <img src={blog.image} alt={blog.title} className="w-full h-auto lg:w-auto lg:h-[300px] object-cover" />
                            </div>
                            <div className="mb-10 flex gap-x-2 text-sm"> {/* Ajout de la classe de marge en bas */}
                                <div className="bg-green-400 text-white px-4 rounded-full text-3xl font-semibold">
                                    {blog.category}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p className="text-lg mb-6 text-justify">{blog.description}</p>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Property not found</p>
            )}
        </div>
        <div className="px-[3%] md:px-[6%]"><BlogPostsList /></div></>

    );
};

export default BlogDetails;
