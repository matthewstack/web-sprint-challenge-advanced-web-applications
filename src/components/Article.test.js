import React from "react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import MutationObserver from "mutationobserver-shim";

import Article from "./Article";
import { render, screen, waitFor } from "@testing-library/react";

const testArticle = {
  id: "",
  headline: "Headline",
  author: "Steven King",
  summary: "",
  body: "",
};

const testArticle2 = {
  id: "",
  headline: "Headline",
  author: "",
  summary: "Blah Blah",
  body: "Blah Blah Blah Blah Blah Blah Blah Blah",
};

test("renders component without errors", () => {
  render(<Article article={testArticle} />);
});

test("renders headline, author from the article when passed in through props", () => {
  render(<Article article={testArticle} />);

  const theHeadline = screen.findByTestId("headline");
  const theAuthor = screen.findByTestId("author");

  expect(theHeadline).toBeTruthy();
  expect(theAuthor).toBeTruthy();
});

test('renders "Associated Press" when no author is given', () => {
  render(<Article article={testArticle2} />);

  const associatedPress = screen.getByText(/Associated Press/i);

  expect(associatedPress).toBeTruthy();
});

test("executes handleDelete when the delete button is pressed", async () => {
  const handleDeleteMock = jest.fn();

  render(<Article handleDelete={handleDeleteMock} article={testArticle2} />);

  const deleteButton = screen.getByTestId("deleteButton");
  userEvent.click(deleteButton);

  await waitFor(() => expect(handleDeleteMock).toHaveBeenCalled());
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
