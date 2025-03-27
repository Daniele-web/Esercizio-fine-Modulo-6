import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import draftToHtml from "draftjs-to-html"
import { Navigate, useNavigate } from "react-router-dom";



const NewBlogPost = props => {

  const [text, setText] = useState("");

  const [cover, setCover] = useState("")

  const initialFormValue = {
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: 0,
      unit: ""
    },
    author: "",
    content: ""
  }


  const [formValue, setFormValue] = useState(initialFormValue)

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
    console.log('form aggiornato')
  }

  const handleChangeImage = (event) => {
    handleChangeFormValue(event)
    setCover(event.target.files[0])
    console.log('immagine caricata')
  }


  const handleChangeContent = useCallback(value => {

    setText(draftToHtml(value));
    console.log(text)

    setFormValue({
      ...formValue,
      content: draftToHtml(value)
    })
    console.log('editor aggiornato')
  });

  const createPost = async (formValue, cover) => {
    try {
      console.log("precedentemente alla fetch")
      const formData = new FormData()

      formData.append('cover', cover)
      formData.append('category', formValue.category)
      formData.append('title', formValue.title)
      formData.append('readTime', JSON.stringify(formValue.readTime))
      formData.append('author', '')
      formData.append('content', formValue.content)

      console.log(formValue)

      const res = await fetch('http://localhost:4000/blogPosts', {
        method: "POST",
        body: formData
      })

      console.log("dopo la fetch")

      const data = await res.json()

      if (window.confirm('Articolo caricato, continua la navigazione')) {
        window.location.href = 'http://localhost:3000/';
      };

      return data

    } catch (error) {
      return { error: "Errore nel caricamento dell'articolo" }
    }
  };



  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" name="title" onChange={handleChangeFormValue} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3" >
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" name="category" onChange={handleChangeFormValue}>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="cover" className="mt-3 mb-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control type="file" onChange={handleChangeImage} name="cover" />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor value={text} onChange={handleChangeContent} className="new-blog-content" name="content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="button"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={() => createPost(formValue, cover)}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
