import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiTrash } from "react-icons/fi";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../../data/dummyData";

const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextTestimonial = () => {
    setStartIndex(prevIndex => Math.min(prevIndex + 2, testimonials.length - 2));
  };

  const prevTestimonial = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - 2, 0));
  };

  const deleteTestimonial = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(startIndex + index, 1);
    setStartIndex(0); // Reset startIndex to ensure correct display after deletion
    // Update the state with the updated testimonials array
    // You need to have a mechanism to update your data source, whether it's state, context, or something else
  };

  return (
    <div className="pt-10 pb-16 relative">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">Testimonial</h1>
      
        <h1 className="heading relative">
      
          <button onClick={prevTestimonial} className="absolute left-0 top-0 mt-2 flex-align-center gap-x-2 hover:underline text-primary" disabled={startIndex === 0}>
            <FiArrowLeft />
            Précédent
          </button>
          Our Testimonial 
     
     <br></br>
          <button onClick={nextTestimonial} className="absolute right-0 top-0 mt-2 flex-align-center gap-x-2 hover:underline text-primary" disabled={startIndex + 2 >= testimonials.length}>
            Suivant
            <FiArrowRight />
          </button>
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {testimonials.slice(startIndex, startIndex + 1).map((testimonial, index) => (
          <div key={index} className="relative">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
