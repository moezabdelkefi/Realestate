import React, { useState, useEffect } from "react";

const Testimonial = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [testimonials, setTestimonials] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour vérifier si l'utilisateur est connecté à partir du stockage local
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAddTestimonial = () => {
    // Vérifier si l'utilisateur est connecté
    if (!isLoggedIn) {
      alert("Please login to add testimonial");
      return;
    }

    // Vérifier que tous les champs sont remplis
    if (!name || !message || !note) {
      alert("Please fill in all fields");
      return;
    }
  
    // Créer un nouvel objet de témoignage
    const newTestimonial = {
      name,
      contenu: message, // Champ 'message' renommé en 'contenu'
      note: parseFloat(note) // Convertir la note en nombre si elle est une chaîne
    };
  
    // Afficher l'alerte de succès
    alert("Testimonial added successfully");
  
    // Envoyer les données à l'API
    fetch("http://localhost:8000/userAuth/temoinage-create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTestimonial)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Ajouter le témoignage à la liste des témoignages
      setTestimonials([...testimonials, data]);
      // Réinitialiser les champs du formulaire après l'ajout du témoignage
      setName("");
      setMessage("");
      setNote("");
    })
    .catch(error => {
      console.error('There was an error!', error.message);
      alert("Failed to add testimonial");
    });
  };
  
  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="w-96 border rounded p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Testimonial</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-lg font-medium">Name:</label>
            <input type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-lg font-medium">Message:</label>
            <textarea className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block mb-2 text-lg font-medium">Note:</label>
            <input type="number" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="note" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <button type="button" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleAddTestimonial}>Add Testimonial</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonial;
