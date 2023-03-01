import React from 'react';
import './App.css';
import ArticleList from './Components/ArticleList/ArticleList';
import Title from './Components/Title/Title';
import Footer from './Components/Footer/Footer';

require('dotenv').config()

function App() {
    return (
        <div className='App'>
            <Title />
            <ArticleList />
            <Footer />
        </div>
    )
}

export default App;
