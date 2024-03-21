import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../../data/dummyData";

const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextTestimonial = () => {
    const newIndex = Math.min(startIndex + 2, testimonials.length - 2);
    setStartIndex(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = Math.max(startIndex - 2, 0);
    setStartIndex(newIndex);
  };

  return (
    <div className="pt-10 pb-16 relative">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">testimonial</h1>
        <h1 className="heading relative">
          <button onClick={prevTestimonial} className="absolute left-0 top-0 mt-2 flex-align-center gap-x-2 hover:underline text-primary">
            <FiArrowLeft />
            Previous
          </button>
          What they're saying about our work feedback
          {startIndex + 2 < testimonials.length && (
            <button onClick={nextTestimonial} className="absolute right-0 top-0 mt-2 flex-align-center gap-x-2 hover:underline text-primary">
              Next
              <FiArrowRight />
            </button>
          )}
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {testimonials.slice(startIndex, startIndex + 2).map((testimonial) => (
          <TestimonialCard {...testimonial} key={testimonial.id} />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
