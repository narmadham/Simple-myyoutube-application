
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';


export default class DateSlider extends Component {
	constructor(props) {
    super(props);
 
    this.state = {
      values: {
        min: 0,
        max: 0
      },
    };

    this._handleValuesChange = this._handleValuesChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      values: {
        min: Math.min.apply(Math, (this.props.dates)),
        max: Math.max.apply(Math, (this.props.dates))
      }
    });
  }
   componentWillReceiveProps(nextProps) {
    if(!(nextProps.dates.min === this.state.min && nextProps.dates.max === this.state.max)) {
        this.setState({
          values: {
            min: Math.min.apply(Math, (nextProps.dates)),
            max: Math.max.apply(Math, (nextProps.dates))
          }
        });
      }
    }

  _handleValuesChange(component, values) {
    this.setState({
      values: values
    });
    this.props.changeHandler(values);
  }

	_onItemSelected(event) {
		this.props.filterByCategory(event.currentTarget.dataset.id);
	}
	render() {
	    return (
	      <InputRange
	        maxValue={Math.max.apply(Math, (this.props.dates))}
	        minValue={Math.min.apply(Math, (this.props.dates))}
	        value={this.state.values}
	        onChange={this._handleValuesChange}
	      />
	    );
  }
}

DateSlider.propTypes = {
	changeHandler: React.PropTypes.func,
	dates: React.PropTypes.array
};
