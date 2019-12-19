/*
 * @Description: 
 * @Author: 杨欣
 * @Date: 2019-12-19 11:34:30
 * @Github: https://github.com/yangxinSamsara
 */
import React, { Component } from 'react'
import { useLocation, BrowserRouter as Router, Link } from 'react-router-dom'
export default class QueryParams extends Component {
    render() {
        return (
            <Router>
                <QueryParamsDemo />
            </Router>
        )
    }
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
    let query = new useQuery();
    return (
        <div>
            <h2>websites</h2>
            <ul className="clearfix">
                <li><Link to="/query/websit?name=baidu">baidu</Link></li>
                <li><Link to="/query/websit?name=souhu">souhu</Link></li>
                <li><Link to="/query/websit?name=sougou">sougou</Link></li>
            </ul>
            <Child name={query.get('name')} />
        </div>
    )
}

function Child({ name }) {
    return (
        <div>
            {name ? <h3>the name is {name}</h3> : <h3 style={{ color: 'red' }}>name is undefind</h3>}
        </div>
    )
}