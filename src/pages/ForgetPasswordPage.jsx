import React, { useState } from "react";

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSendClick = () => {
        // Vous pouvez ajouter ici la logique pour envoyer l'email de récupération de mot de passe
        console.log("Email entered:", email);
        // Réinitialiser l'email après l'envoi
        setEmail("");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="font-semibold text-4xl mb-6">Forgot Password</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Enter your email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="mt-1 p-2 text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Your email address"
                />
            </div>
            <button
                onClick={handleSendClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Send
            </button>
        </div>
    );
};

export default ForgetPasswordPage;
