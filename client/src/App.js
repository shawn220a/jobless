import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';

//**************************************************************************************/

// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import Profile from './pages/Profile/Profile';
// import Users from './pages/Users/Users';
// import Admin from './pages/Admin/Admin';
// import NotFound from './pages/NotFound/NotFound';


//************************************************************************************ */
import BlogForm from './components/BlogComponents/BlogArticle/BlogForm';


import Home from './Pages/home';
// import BlogArticle from './pages/BlogArticle/Form';
import BlogHome from './Pages/bloghome.jsx';
import About from './Pages/about';





function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route exact path="/" component={Home} />

        <Route exact path="/blog/post" component={BlogForm} />
        <Route exact path="/blog" component={BlogHome} />
         <Route exact path="/about" component={About} />
        {/* <Route exact path="/joblistings" component={JobListings} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/blogpost" component={BlogArticle} />
        <Route exact path="/bloghome" component={BlogHome} />
        <Route exact path="/about" component={About} />
          <Route exact path="/joblistings" component={JobListings} />
        <Route exact path="/login" component={Login} />   */}


         }

       <div>
       <Footer />
       </div>
       </div>
    </Router>
  
 
    
  );
}

export default App;
