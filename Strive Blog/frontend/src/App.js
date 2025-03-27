import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./views/login/LoginForm";
import AuthorContext from "./context/AuthorContextProvider";



function App() {
  return (
    <AuthorContext>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/new" element={<NewBlogPost />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <Footer />
      </Router>
    </AuthorContext>
  );
}

export default App;
