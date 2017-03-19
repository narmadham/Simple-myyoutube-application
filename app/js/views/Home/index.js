import React, { Component } from 'react';
import { Link } from 'react-router';
import YoutubeAutocomplete from 'react-youtube-autocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';
import GridItem from './../../components/gridItem';
import Tags from './../../components/tags';
import { Grid, Row, Col } from 'react-bootstrap';
import { getFilteredData, getDates } from './selectors';
import DateSlider from './../../components/dateSlider';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: true
    };
    this._onSearchResultsFound = this._onSearchResultsFound.bind(this);
    this._onFilter = this._onFilter.bind(this);
    this._onDateFilter = this._onDateFilter.bind(this);
  }

  componentDidMount() {
    this.props.actions.setDefaults();
  }

  _onSearchResultsFound(results) {
    this.props.actions.getFullDetails(results);
    this.setState({ initial: false });
  }

  _onFilter(id) {
    this.props.actions.filterByCategory(id);
  }

  _onDateFilter(vals) {
    this.props.actions.filterByDate(vals);
  }

  render() {
    const { children } = this.props;
    const showSaveBtn = true;

    return (
      <div className="home">
        <section className="jumbotron text-center">
          <div className="container">
            <YoutubeAutocomplete
              apiKey="AIzaSyCTxKpIGbIt7CIizPNGCiG2DVZdx6PMuEQ"
              maxResults="20"
              placeHolder="Search Youtube"
              callback={this._onSearchResultsFound}
            />
          </div>
        </section>
        {this.props.dates &&
          this.props.dates.length > 3 &&
          !this.props.fetching &&
          <section className="dateContainer">
            <section className="container d-flex justify-content-between">
              <DateSlider
                dates={this.props.dates}
                changeHandler={this._onDateFilter}
              />
            </section>
          </section>}
        {this.props.categories.length > 0 &&
          !this.props.fetching &&
          <section className="tagBar">
            <section className="container d-flex justify-content-between">
              {this.props.categories.map(result => (
                <Tags
                  key={result.id}
                  id={result.id}
                  title={result.title}
                  filterByCategory={this._onFilter}
                />
              ))}
            </section>
          </section>}

        <section
          className="bodyContainer container d-flex justify-content-between"
        >
          {!this.props.fetching &&
            <Row>
              <Col>
                {this.props.fullDetails.length > 0 &&
                  this.props.fullDetails.map(result => (
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
                  ))}
              </Col>
              {!this.state.initial &&
                !this.props.fullDetails.length &&
                <Col>
                  <h4>Sorry! no results found</h4>
                </Col>}
            </Row>}

        </section>
        {this.props.fetching && <span>Loading....</span>}
      </div>
    );
  }
}
HomePage.propTypes = {
  actions: React.PropTypes.object,
  fullDetails: React.PropTypes.any,
  categories: React.PropTypes.array,
  filteredData: React.PropTypes.any,
  dates: React.PropTypes.array,
  fetching: React.PropTypes.bool
};

function mapStateToProps(state) {
  return {
    fullDetails: getFilteredData(state),
    categories: state.getIn(['home', 'categories']).toJS(),
    dates: getDates(state),
    fetching: state.get('fetching'),
    noData: state.get('noData')
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    {},
    bindActionCreators(actionCreators, dispatch)
  );

  return {
    actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
