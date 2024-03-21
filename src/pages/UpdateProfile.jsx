import React, { useState, useRef } from 'react';

const UpdateProfile = () => {
  const fileInputRef = useRef(null); // Référence pour l'input de type file

  // State pour stocker les données du formulaire et les erreurs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: null // Pour stocker l'image de profil
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  // Fonction pour mettre à jour les données du formulaire lors de la saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Réinitialiser l'erreur du champ lorsque l'utilisateur commence à taper à nouveau
    setFormErrors({ ...formErrors, [name]: '' });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs
    const errors = {};
    Object.keys(formData).forEach(key => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        errors[key] = errorMessage;
      }
    });

    // Affichage des erreurs s'il y en a
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Si pas d'erreurs, envoyer les données au serveur ou effectuer d'autres actions
    console.log(formData);
  };

  // Fonction pour valider un champ spécifique
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Email is invalid';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters long';
      case 'phoneNumber':
        return /^\d{10}$/.test(value) ? '' : 'Phone number is invalid';
      default:
        return '';
    }
  };

  // Fonction pour gérer le clic sur l'image de profil
  const handleImageClick = () => {
    fileInputRef.current.click(); // Déclenche l'input de type file
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-3 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="mb-3 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {formErrors.phoneNumber && <p className="text-danger">{formErrors.phoneNumber}</p>}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone:</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
