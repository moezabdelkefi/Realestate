import React, { useState } from "react";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user"); // Initialisation avec "user"

  const handleAddTestimonial = () => {
    // Vérifier que tous les champs sont remplis
    if (!name || !email || !password || !phone) {
      alert("Please fill in all fields");
      return;
    }

    // Créer un nouvel objet de témoignage
    const newTestimonial = {
      name,
      email,
      password,
      phone,
      role,
    };

    // Afficher l'alerte de succès
    alert("Profile updated successfully");

    // Envoyer les données à l'API
    fetch("http://localhost:8000/userAuth/update_user/", {
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
      // Mettre à jour les informations de profil
      // (à définir selon la réponse de l'API)
      // Exemple: setProfileData(data);
      // Réinitialiser les champs du formulaire après la mise à jour du profil
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("user"); // Réinitialisation de l'état du rôle à "user"
    })
    .catch(error => {
      console.error('There was an error!', error.message);
      alert("Failed to update profile");
    });
  };

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="w-96 border rounded p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Update Profile</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-lg font-medium">I'm a:</label>
            <input type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-lg font-medium">Name:</label>
            <input type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-lg font-medium">Email:</label>
            <input type="email" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-lg font-medium">Password:</label>
            <input type="password" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-lg font-medium">Phone:</label>
            <input type="tel" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <button type="button" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleAddTestimonial}>Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
