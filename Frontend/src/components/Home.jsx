import React from 'react';
import NavBar from './NavBar';
import './Home.css';
import { TechShowcase } from './TechShowcase';

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======

>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
const Home = () => {
  return (
    <div className="background-container">
      <div className="navbar">
        <NavBar />
      </div>
      
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div className="content">
<<<<<<< HEAD
        {/*  logotitle in animated div */}
=======
        {/* ✅ Wrap logotitle in animated div */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
        <div className="opacity-0 animate-[fade-in_0.7s_ease-out_forwards]">
          <p className="logotitle">Cosmico AI</p>
        </div>

        <p className="subtitle text-center mx-auto leading-relaxed opacity-0 animate-[fade-in_0.7s_ease-out_0.3s_forwards]">
          A Hub for Researchers <br /> Powered by OpenAI & ArXiV
        </p>

      </div>

<<<<<<< HEAD
      {/* Tech  Section */}
=======
      {/* Tech Strip Section */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
      <div className="absolute bottom-0 w-full z-10 opacity-0 animate-[fade-in_0.7s_ease-out_0.6s_forwards]">
        <TechShowcase />
      </div>
    </div>
  );
};

export default Home;
