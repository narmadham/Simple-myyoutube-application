import React, { PropTypes, Component } from 'react';



export default class Tags extends Component {
	constructor(props) {
		super(props);
		this._onItemSelected = this._onItemSelected.bind(this);
	}

	_onItemSelected(event) {
		this.props.filterByCategory(event.currentTarget.dataset.id);
	}
  render() {
    return (	
		 <a data-id={this.props.id} className="tagStyle" onClick={this._onItemSelected}>{this.props.title}</a>
    );
  }
}

Tags.propTypes = {
	title: React.PropTypes.string,
	id: React.PropTypes.string,
	filterByCategory: React.PropTypes.func

};
