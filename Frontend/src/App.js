import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MissionSection from './components/MissionSection';
import ChatSection from './components/ChatSection';
import ContactSidebar from './components/ContactSidebar';
import NavBar from './components/NavBar';
import ChatPage from './pages/ChatPage'; // you'll create this
<<<<<<< HEAD
<<<<<<< HEAD
import CosmicoVsGPT from "./components/CosmicoVsGPT";
=======
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
import CosmicoVsGPT from "./components/CosmicoVsGPT";
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)

const MainLayout = () => (
  <>
    <NavBar />
    <ContactSidebar />
    <Home />
    <MissionSection />
<<<<<<< HEAD
<<<<<<< HEAD
    <CosmicoVsGPT />
=======
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
    <CosmicoVsGPT />
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
    <ChatSection />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
