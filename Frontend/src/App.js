import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MissionSection from './components/MissionSection';
import ChatSection from './components/ChatSection';
import ContactSidebar from './components/ContactSidebar';
import NavBar from './components/NavBar';
import ChatPage from './pages/ChatPage'; // you'll create this

const MainLayout = () => (
  <>
    <NavBar />
    <ContactSidebar />
    <Home />
    <MissionSection />
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
