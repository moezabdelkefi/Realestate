import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FaQuoteRight } from "react-icons/fa";

const TestimonialCard = ({ contenu, name, note }) => {
  const [temoinages, setTemoinages] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:8000/userAuth/temoinages/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        return response.json();
      })
      .then((data) => {
        setTemoinages(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des témoignages :", error);
      });
  }, []);

  return (
    <div>
      {temoinages.map((temoinage) => (
        <div className="card flex-1 basis-[16rem] relative" key={temoinage.id}>
          <div className="absolute opacity-10 text-9xl top-0 left-0">
            <FaQuoteRight />
          </div>
          <p>{temoinage.contenu}</p>
          <div className="mt-3 flex gap-x-3">
            <div>
              <h1 className="font-semibold capitalize">{temoinage.name}</h1>
              <div className="mt-3">
                <h1>note : {temoinage.note}</h1>
                <ReactStars
                  count={5}
                  value={temoinage.note} // Utilise la valeur de la note récupérée depuis l'API
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCard;
