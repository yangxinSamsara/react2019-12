import React from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch, useParams, Redirect, useHistory, useLocation
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Cloak from './components/Clock/Clock'
import CalcWeight from './components/CalcWeight/CalcWeight.jsx'
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
    return (
      <Router>
        <div>
          <h1>About</h1>
          <AuthButton />
          <ul className="clearfix">
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <div>
            <Switch>
              <Route path="/public">
                <PublicPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/protected">
                <ProtectedPage />
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/public"));
        }}
      >Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    );
}

function PrivateRoute({ children, ...rest }) {
  console.log(children,rest)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
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

class Topics extends React.Component {
  constructor() {
    super()
    this.state = { flag: false }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ flag: true })
  }
  render() {
    let { match } = this.props;
    return (<div>
      <h2>Topics</h2>
      <ul className="clearfix">
        <li><Link to={`${match.url}/topic1`}>Topic1</Link></li>
        <li><Link to={`${match.url}/topic2`}>Topic2</Link></li>
        <li><Link to={`${match.url}/topic3`}>Topic3</Link></li>
        <li><button onClick={this.handleClick}>点击重定向</button></li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route exact path={match.path} component={PSelect} />
      </Switch>
    </div>)
  }
}

function PSelect() {
  return (<h3>Please select a topic.</h3>)
}

function Topic({ match }) {
  // useParams 只能用于函数类组件中
  let { topicId } = useParams()
  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}

class App extends React.Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>用于构建用户界面的JavaScript库</h3>
      </header>
      <div className="Maiin">
        <Router>
          <div className="nav">
            <ul className="clearfix">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/inbox">Inbox</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>
          </div>
          <div className="nav-content">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/topics" component={Topics} />
          </div>
        </Router>
      </div>
    </div>)
  }
}

export default App;
