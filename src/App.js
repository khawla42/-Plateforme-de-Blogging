import React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogList from './pages/intrface1';
import BlogForm from './pages/intrface2';
import Login from './pages/login';
import Interface from './pages/layoute'; 
import BlogDetails from './pages/BlogDetails';
import layoute from './pages/layoute';
import Contact from './pages/contact';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
       
        <Route pat="home" element={<layoute />}></Route>
        <Route path="/" element={<Interface />}>
          <Route index element={<BlogList />} />
          <Route path="new" element={<BlogForm />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="login" element={<Login />} /> 
          <Route path="/contact" element={<Contact />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;