import React, { useState } from "react";
import styled from "styled-components";

const initialArticle = {
  id: JSON.stringify(Date.now()),
  //   had to stringify or it wasn't pulling ID correctly
  headline: "",
  author: "",
  summary: "",
  body: "",
  image: Math.floor(Math.random() * 100),
  //   This creates a random number and rounds down to nearest whole number
};

const AddArticleForm = (props) => {
  const [article, setArticle] = useState(initialArticle);

  const { handleAdd, handleAddCancel } = props;

  const handleChange = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(article);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleAddCancel();
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Add Article</h3>
      <div>
        <label>Headline</label>
        <input
          value={article.headline}
          name="headline"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Author</label>
        <input value={article.author} name="author" onChange={handleChange} />
      </div>
      <div>
        <label>Summary</label>
        <input value={article.summary} name="summary" onChange={handleChange} />
      </div>
      <div>
        <label>Body</label>
        <input value={article.body} name="body" onChange={handleChange} />
      </div>
      <Button id="addButton">Add Article</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </FormContainer>
  );
};

export default AddArticleForm;

const FormContainer = styled.form`
  padding: 1em;
  width: 400px;
  background: white;

  label {
    margin-top: 0.5em;
  }

  input {
    padding: 0.5em;
  }

  div {
    margin: 0.5em 0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1em;
  margin-top: 1em;
`;
