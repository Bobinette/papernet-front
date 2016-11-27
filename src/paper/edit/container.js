import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import history from 'routing';

import { paperPropType } from 'utils/constants';

import { deletePaper, getPaper, savePaper, updatePaper } from '../actions';
import { RESET_PAPER } from '../constants';

import PaperEditView from './view';

const mapStateToProps = state => ({
  paper: state.paper.get('paper'),
  loading: state.paper.get('loading'),
});

class PaperEditContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    paper: paperPropType.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onDelete = ::this.onDelete;
    this.onSave = ::this.onSave;
  }

  componentWillMount() {
    const { dispatch, params } = this.props;

    if (params.id) {
      dispatch(getPaper(params.id));
    } else {
      dispatch({ type: RESET_PAPER });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.id !== this.props.params.id) {
      if (nextProps.params.id) {
        dispatch(getPaper(nextProps.params.id));
      } else {
        dispatch({ type: RESET_PAPER });
      }
    }
  }

  onChange(key, value) {
    this.props.dispatch(updatePaper(key, value));
  }

  onDelete() {
    this.props.dispatch(deletePaper()).then(
      () => { history.push('/papers'); }
    );
  }

  onSave() {
    this.props.dispatch(savePaper()).then(
      (paperId) => { history.push(`/papers/${paperId}`); }
    );
  }

  render() {
    const { loading, paper } = this.props;

    // Dangerous. Replace with a loading page.
    if (loading) return null;

    return (
      <div className="PaperEditContainer">
        <PaperEditView
          onChange={this.onChange}
          onSave={this.onSave}
          paper={paper}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperEditContainer);
