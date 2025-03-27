import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import Button from 'react-bootstrap/Button';
import { AuthorContext } from "../../context/AuthorContextProvider";
import { Link, useSearchParams } from "react-router-dom";





const Home = props => {

  let [searchParams, setSearchParams]=useSearchParams()

  useEffect(()=>{
    console.log(searchParams.get('token'))

    if(searchParams.get('token')){
      localStorage.setItem('token', searchParams.get('token'))
      setToken(searchParams.get('token'))
    }
  },[])

  const {token, setToken} = useContext(AuthorContext)

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog</h1>
      {!token && <div>
      <Button variant="primary" href="/login">Login</Button> o
      <Button variant="primary"className="ms-2" as={Link} to={'http://localhost:4000/login-google'}>
        Login con Google
      </Button></div>}
      { token && <BlogList />}
    </Container>
  );
};

export default Home;
