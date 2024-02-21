import { useSelector } from "react-redux";
import { dataStore } from "../../../features/dataSlice";
import SingleProductCard from "../../common/page-componets/SingleProductCard";
import { useState } from "react";
const PropertyList = ({ basis }) => {
  const { currentDataItems } = useSelector(dataStore);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const filteredProperties = currentDataItems.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div  className="flex flex-col items-center justify-center">
    <div className="flex items-center mb-7">
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your address"
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 ml-4"
        >
          <option value="">Buy</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 ml-4"
        >
          <option value="">$150000-$180000</option>
          <option value="option1">$190000-$220000</option>
          <option value="option2">$220000-$300000</option>
          <option value="option3">$300000-$500000</option>
        </select>
      
        <button className="border border-gray-300 rounded-md px-3 py-2 ml-4 bg-blue-500 text-white">
        Search
        </button>
    </div>
    <div className="flex flex-wrap gap-4">
      {filteredProperties.map((property) => (
        <SingleProductCard key={property.id} {...property} basis={basis} />
      ))}
    </div>
  </div>
);
};

export default PropertyList;
