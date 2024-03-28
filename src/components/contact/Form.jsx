import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(' http://localhost:8000/userAuth/api/add_contact/', {
        name: name,
        email: email,
        message: message,
      });

      console.log('Response:', response.data);
      // Réinitialiser les champs du formulaire après l'envoi réussi
      setname('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error.response.data);
      // Gérer les erreurs ici
    }
  };

  return (
    <div className="pt-10 pb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex-col gap-4 flex-align-center sm:flex-row">
          <div className="flex-1 w-full">
            <p>Full Name</p>
            <input
              type="text"
              className="w-full input"
              placeholder="First Name.."
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <p>Email Address</p>
          <input
            type="text"
            className="w-full input"
            placeholder="Email Address.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <p>Message</p>
          <textarea
            rows={4}
            className="w-full input"
            placeholder="Message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-4 flex-center-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
