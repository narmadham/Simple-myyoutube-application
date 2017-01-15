import React, { Component } from 'react';
import { Link } from 'react-router';
import YoutubeAutocomplete from 'react-youtube-autocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';
import GridItem from './../../components/gridItem';
import Tags from './../../components/tags';
import { Grid, Row, Col } from 'react-bootstrap';
import { getFilteredData } from './selectors';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this._onSearchResultsFound = this._onSearchResultsFound.bind(this);
    this._onFilter = this._onFilter.bind(this);
	}

	_onSearchResultsFound(results) {
    this.props.actions.getFullDetails(results);
		// this.props.actions.setData(results);
	}

  _onFilter(id) {
    this.props.actions.filterByCategory(id, this.props.fullDetails);
  }

  render() {
    const { children } = this.props;
    const showSaveBtn = true;

return (
    <div className='home'>
    <section className="jumbotron text-center">
      <div className="container">
          <YoutubeAutocomplete
            apiKey='AIzaSyCTxKpIGbIt7CIizPNGCiG2DVZdx6PMuEQ'
            maxResults='20'
            placeHolder='Search Youtube'
            callback={this._onSearchResultsFound}
          />
      </div>
    </section>
    <section className="tagBar">
    {this.props.categories.length > 0 && this.props.categories.map(result =>
    <Tags
      key={result.id}
      id={result.id}
      title={result.title}
      filterByCategory={this._onFilter}
    />
  )
  }
    </section>
      <div className="bodyContainer">
        <Row> 
        <Col>
         {this.props.fullDetails.length && this.props.fullDetails.map(result =>
          <GridItem
            key={result.id}
            imgUrl={result.snippet.thumbnails.default.url}
            linkUrl={`http://youtube.com/watch?v=${result.id}`}
            title={result.snippet.title}
            addToList={this.props.actions.saveList}
            id={result.id}
            data={result}
            likeCount={result.statistics.likeCount}
            viewsCount={result.statistics.viewCount}
            saveOption={showSaveBtn}
          />
        )}
         </Col>
        </Row>
      </div>
    </div>
); 
}
}
HomePage.propTypes = {
  actions: React.PropTypes.object,
  data: React.PropTypes.any,
  fullDetails: React.PropTypes.any,
  categories: React.PropTypes.array,
  filteredData: React.PropTypes.any
};

function mapStateToProps(state) {
  return {
    data: state.getIn(['home', 'data']).toJS(),
    fullDetails: getFilteredData(state),
    categories: state.getIn(['home', 'categories']).toJS()
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, bindActionCreators(actionCreators, dispatch));

  return {
    actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

