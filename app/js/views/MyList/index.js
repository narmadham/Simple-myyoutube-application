import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions';
import GridItem from './../../components/gridItem';

class MyList extends Component {

	componentDidMount() {
		this.props.actions.loadMyVideos();
	}
  render() {
    const { children } = this.props;
    const showSaveBtn = false;

    return (
      <div className='App'>
		<section className="jumbotron text-center">
		<div className="container">
			<h1>My Videos</h1>
		</div>
		</section>
			<div className="container">
			<div className="row"> 
				{this.props.myVideos.length && this.props.myVideos.map(result =>
				<GridItem
					key={result.id}
					imgUrl={result.snippet.thumbnails.default.url}
					linkUrl={`http://youtube.com/watch?v=${result.id}`}
					title={result.snippet.title}
					saveOption={showSaveBtn}
					id={result.id}
					data={result}
					likeCount={result.statistics.likeCount}
					viewsCount={result.statistics.viewCount}
				/>
				)}
			</div>
		</div>
      </div>
    );
  }
}

MyList.propTypes = {
  actions: React.PropTypes.object,
  myVideos: React.PropTypes.any
};

function mapStateToProps(state) {
  return {
    myVideos: state.getIn(['myList', 'myVideos']).toJS()
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, bindActionCreators(actionCreators, dispatch));

  return {
    actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList);