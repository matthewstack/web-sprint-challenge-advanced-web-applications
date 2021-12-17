import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Article from "./Article";
import EditForm from "./EditForm";
import axiosWithAuth from "../utils/axiosWithAuth";
import AddArticleForm from "./AddArticleForm";

const View = (props) => {
  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`/articles`)
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`/articles/${id}`)
      .then((res) => {
        console.log(res);
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (article) => {
    console.log(article.id);
    axiosWithAuth()
      .put(`articles/${article.id}`, article)
      .then((res) => {
        setArticles(res.data);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (article) => {
    axiosWithAuth()
      .post("articles", article)
      .then((res) => {
        setArticles(res.data);
        setAdding(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCancel = () => {
    setAdding(false);
  };

  const handleEditSelect = (id) => {
    setEditing(true);
    setEditId(id);
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  const addHelper = () => {
    setAdding(true);
  };

  return (
    <ComponentContainer>
      <HeaderContainer>
        View Articles{" "}
        <AddArticleButton onClick={addHelper}>Add Article</AddArticleButton>
      </HeaderContainer>
      <ContentContainer flexDirection="row">
        <ArticleContainer>
          {articles.map((article) => {
            return (
              <ArticleDivider key={article.id}>
                <Article
                  key={article.id}
                  article={article}
                  handleDelete={handleDelete}
                  handleEditSelect={handleEditSelect}
                />
              </ArticleDivider>
            );
          })}
        </ArticleContainer>

        {editing && (
          <EditForm
            editId={editId}
            handleEdit={handleEdit}
            handleEditCancel={handleEditCancel}
          />
        )}
        {adding && (
          <AddArticleForm
            handleAdd={handleAdd}
            handleAddCancel={handleAddCancel}
          />
        )}
      </ContentContainer>
    </ComponentContainer>
  );
};

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils.
//2. When the component mounts, make an http request that adds all articles to state.
//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.

const Container = styled.div`
  padding: 0.5em;
`;
const HeaderContainer = styled.h1`
  display: flex;
  justify-content: space-between;
  border-bottom: solid black 2px;
  padding: 1em;
  margin: 0;
  font-size: 1.5em;
  background: black;
  color: white;
`;

const ArticleDivider = styled.div`
  border-bottom: 1px solid black;
  padding: 1em;
`;

const ComponentContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
`;

const ArticleContainer = styled.div`
  background: grey;
`;

const AddArticleButton = styled.button`

    background-color: white;
    border-radius: 4px;
    color: black;
    border: 2px solid #e7e7e7;
    font-size: 24px;
  
  
  &:hover {
    background-color: #555555;
    color: white;
`;
