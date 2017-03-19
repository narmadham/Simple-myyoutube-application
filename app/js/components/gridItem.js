import React, { PropTypes, Component } from 'react';

export default class GridItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saveTxt: 'Add to list', // Not correct implementation. Move it to content
            selected: false
        };

        this._onItemSelected = this._onItemSelected.bind(this);
    }

    _onItemSelected(event) {
        this.props.addToList(event.currentTarget.dataset.id, this.props.data);
        this.setState({ saveTxt: 'Added to list !!!', selected: true });
    }
    render() {
        return (
            <div className="tile col-xs-12 col-md-3 col-sm-4">
                <a href={this.props.linkUrl}>
                    <img src={this.props.imgUrl} alt={this.props.imgUrl} />
                </a>
                <ul className="tile__details">
                    <li className="tile__details__title">{this.props.title}</li>
                    <li><span>Like: </span> {this.props.likeCount}</li>
                    <li><span>Views: </span>{this.props.viewsCount}</li>
                </ul>

                {this.props.saveOption &&
                    <a onClick={this._onItemSelected} data-id={this.props.id}>
                        {this.state.saveTxt}
                    </a>}
            </div>
        );
    }
}

GridItem.propTypes = {
    imgUrl: React.PropTypes.string,
    title: React.PropTypes.string,
    linkUrl: React.PropTypes.string,
    addToList: React.PropTypes.func,
    id: React.PropTypes.string,
    data: React.PropTypes.object,
    likeCount: React.PropTypes.any,
    viewsCount: React.PropTypes.any,
    saveOption: React.PropTypes.bool
};
