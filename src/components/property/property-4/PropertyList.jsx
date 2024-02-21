import { useSelector } from "react-redux";
import { dataStore } from "../../../features/dataSlice";
import SingleProductCard from "../../common/page-componets/SingleProductCard";
import { useState } from "react";
import Filters from '../../home/home-1/Filters';

const PropertyList = ({ basis }) => {
  const { currentDataItems } = useSelector(dataStore);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const filteredProperties = currentDataItems.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="pt-20 px-[3%] md:px-[6%]">
          <Filters />      

    <div  className="flex flex-col items-center justify-center">
    <div className="flex items-center mb-7">
    </div>
    <div className="flex flex-wrap gap-4">
      {filteredProperties.map((property) => (
        <SingleProductCard key={property.id} {...property} basis={basis} />
      ))}
    </div>
  </div>
  </div>
);
};

export default PropertyList;