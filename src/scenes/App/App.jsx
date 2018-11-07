import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Article from '../Article/Article';
import ArticleDialog from '../Article/ArticleDialog';

const App = () => (
  <React.Fragment>
    <BrowserRouter>
      <React.Fragment>
        <Route path="/" component={Home} exact />
        <Route path="/:id" exact component={Article} />
      </React.Fragment>
    </BrowserRouter>
    <ArticleDialog />
  </React.Fragment>
);

export default App;
