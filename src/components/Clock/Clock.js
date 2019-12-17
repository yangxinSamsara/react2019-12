import React from 'react'

class Cloak extends React.Component {
    constructor() {
        super()
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    render() {
        return (<div>
            <span>{this.state.date.toLocaleTimeString()}</span>
        </div>)
    }
}
export default Cloak;