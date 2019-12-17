import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Cloak from './components/Clock/Clock'
import CalcWeight from './components/CalcWeight/CalcWeight'
import Combination from './components/Combination/Combination'
import FilterProduct from './components/FilterProduct/FilterProduct'
const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

class About extends React.Component {
  render() {
    return (<div>
      <h1>About</h1>
    </div>)
  }
}
class Inbox extends React.Component {
  render() {
    return (<div>
      <h1>Inbox</h1>
    </div>)
  }
}

class Home extends React.Component {
  render() {
    return (<div>
      <div><Cloak /></div>
      <div><Combination /></div>
      <div><FilterProduct products={PRODUCTS} /></div>
      <div>
        <CalcWeight />
      </div>
    </div>)
  }
}

// 不使用react-router
// class App extends React.Component {
//   constructor() {
//     super()
//     this.state = { route: '' }
//   }
//   componentDidMount() {
//     window.addEventListener('hashchange', () => {
//       this.setState({
//         route: window.location.hash.substr(1)
//       })
//     })
//   }
//   render() {
//     let Child
//     switch (this.state.route) {
//       case '/about': Child = About; break;
//       case '/inbox': Child = Inbox; break;
//       default: Child = Home;
//     }
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h3>用于构建用户界面的JavaScript库</h3>
//           <p>
//             <a href="#/home"><button>home</button></a>
//             <a href="#/about"><button>about</button></a>
//             <a href="#/inbox"><button>inbox</button></a>
//           </p>
//         </header>
//         <div className="container">
//           <Child />
//         </div>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>用于构建用户界面的JavaScript库</h3>
      </header>
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/inbox">Inbox</Link>
              </li>
            </ul>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/inbox" component={Inbox} />
            </div>
          </div>
        </Router>
      </div>
    </div>)
  }
}

export default App;
