'use client';

import { useRef, useState } from 'react';

const ContactUs = ({ userID }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const messageRef = useRef();
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID, // Pass the userID if applicable
        name: nameRef.current.value,
        email: emailRef.current.value,
        mobile: mobileRef.current.value,
        message: messageRef.current.value,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setResponseMessage(data.message);
    } else {
      setResponseMessage('Error submitting the form');
    }

    nameRef.current.value = '';
    emailRef.current.value = '';
    mobileRef.current.value = '';
    messageRef.current.value = '';
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Get in Touch with Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.910410964091!2d80.63434397460921!3d16.53061992692215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35e5a53bc09633%3A0x209bed35874fc471!2sSSB%20AUTOMATIONS!5e0!3m2!1sen!2sin!4v1723533035824!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SDRB Technologies Location"
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              We would love to hear from you
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  ref={nameRef}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  ref={emailRef}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  ref={mobileRef}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows="4"
                  ref={messageRef}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
              >
                Send
              </button>
            </form>
            {responseMessage && (
              <p className="mt-4 text-green-500 font-medium text-center">{responseMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
