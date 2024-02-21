
import { property } from "../../../data/dummyData";
import SingleProductCard from "./SingleProductCard";
import { Link } from "react-router-dom";


const Featured = () => {
  return (
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">featured</h1>
        <div className="flex justify-between items-center">
        <div>
          <h1 className="heading">Explore Featured Latest Properties</h1>
        </div>
        <div>
          <Link to="/property" ><p className="text:lg text-primary">Explore All</p> </Link>
        </div>
      </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {property.slice(0, 3).map((featured) => (
          <SingleProductCard key={featured.id} {...featured} />
        ))}
      </div>
    </div>
  );
};

export default Featured;