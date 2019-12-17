import React from 'react'
import './Combination.css'

function Border(props) {
    return (<div className={'border border-' + props.color}>
        {props.children}
    </div>)
}

function Dialog() {
    return (<Border color="blue">
        <h1 className="Dialog-title">
            Welcome
      </h1>
        <p className="Dialog-message">
            Thank you for visiting our spacecraft!
      </p>
    </Border>)
}

class Combination extends React.Component {
    render(){
        return(<div>
            <Dialog />
        </div>)
    }
}
export default Combination;