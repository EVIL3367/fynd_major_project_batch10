import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//pages
import Navbar from "./components/Navbar";
import About from './pages/About';
import Article from './pages/Article';
import ArticleList from './pages/ArticleList';
import Home from "./pages/Home";
import Notfound from "./pages/notfound";
function App() {
  
  return (
   
      <Router>
        <Navbar />
    <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/article-list' element={<ArticleList />} />
          <Route path='/article/:name' element={<Article />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </div>
      </Router>
      
    
  )
}

export default App
