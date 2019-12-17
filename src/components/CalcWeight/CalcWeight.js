import React from 'react'
const scalcs = { 'j': '斤', 'k': '千克' }
class WeightInput extends React.Component {
    handleChange(e) {
        this.props.weightChange(e.target.value)
    }
    render() {
        const weight = this.props.weight;
        const scalc = this.props.scalc;
        return (<fieldset>
            <legend>输入{scalcs[scalc]}：</legend>
            <input value={weight} onChange={this.handleChange.bind(this)} />
        </fieldset>)
    }
}
class Tips extends React.Component {
    render() {
        if (this.props.weight > 200) {
            return (<div>
                <p>你超重了！</p>
            </div>)
        } else {
            return (<div>
                <p>没有超重！</p>
            </div>)
        }
    }
}
class CalcWeight extends React.Component {
    constructor() {
        super()
        this.state = {
            weight: '',
            scalc: 'k'
        }
    }
    handleKg(weight) {
        this.setState({ scalc: 'k', weight })
    }

    handleJin(weight) {
        this.setState({ scalc: 'j', weight })
    }

    render() {
        const weight = this.state.weight;
        const scalc = this.state.scalc;
        const kg = scalc === 'k' ? weight : weight / 2;
        const jin = scalc === 'j' ? weight : (weight ? weight * 2 : weight);
        return (<div>
            <WeightInput scalc='k' weight={kg} weightChange={this.handleKg.bind(this)} />
            <WeightInput scalc='j' weight={jin} weightChange={this.handleJin.bind(this)} />
            <Tips weight={parseFloat(weight)} />
        </div>)
    }
}
export default CalcWeight;