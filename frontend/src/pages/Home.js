import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Users,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-5xl font-extrabold mb-6">
              Healthcare at Your Fingertips
            </h1>

            <p className="text-blue-100 text-lg mb-8">
              AI-powered diagnosis, doctor consultation, and health tracking in one place.
            </p>

            <div className="flex gap-4 flex-wrap">

              <button
                onClick={() => navigate('/diagnosis')}
                className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold shadow hover:scale-105 transition"
              >
                Start Diagnosis <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 border border-white text-white rounded-xl hover:bg-white/10 transition"
              >
                Sign In
              </button>

            </div>
          </div>

          <div className="hidden md:block text-center bg-white/10 p-10 rounded-3xl backdrop-blur-md">
            <div className="text-6xl">🏥</div>
            <p className="mt-4 text-blue-100">AI Healthcare Assistant</p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold">Why Choose Us?</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {[
            { icon: Zap, title: "AI Powered", desc: "Smart diagnosis system" },
            { icon: Users, title: "Doctors", desc: "Verified professionals" },
            { icon: Activity, title: "Health Tracking", desc: "Monitor progress" },
            { icon: TrendingUp, title: "Insights", desc: "Health analytics" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <item.icon className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to start your health journey?
        </h2>

        <button
          onClick={() => navigate('/diagnosis')}
          className="px-10 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

    </div>
  );
};

export default Home;