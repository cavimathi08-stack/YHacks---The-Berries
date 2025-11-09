
import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Living in a remote community, getting specialized medical advice was always a challenge. OnAURA has been a game-changer. I feel more connected to my health and more empowered than ever before.",
    name: 'Kaelen',
    role: 'Patient, Northern Saskatchewan',
    avatar: 'https://i.pravatar.cc/150?u=kaelen',
  },
  {
    id: 2,
    quote: "This app bridges a critical gap in women's healthcare. The at-home monitoring tool is innovative, and the platform allows us to connect with patients who might otherwise fall through the cracks. It's an essential tool for modern community medicine.",
    name: 'Dr. Anya Sharma',
    role: 'Oncologist, Partner Clinic',
    avatar: 'https://i.pravatar.cc/150?u=dranya',
  },
  {
    id: 3,
    quote: "The community forum is incredible. It’s a safe space to ask questions and share experiences without judgment. Knowing you're not alone on this journey makes all the difference.",
    name: 'Marie',
    role: 'Survivor, Manitoba',
    avatar: 'https://i.pravatar.cc/150?u=marie',
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700">What Our Community Says</h1>
        <p className="text-lg text-pink-700/90 mt-2">
          Stories of empowerment, connection, and health.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg flex flex-col justify-between">
            <p className="text-gray-700 leading-relaxed italic mb-6">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="w-12 h-12 rounded-full border-2 border-pink-300" />
              <div className="ml-4">
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
