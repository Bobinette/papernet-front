import React, { Component, PropTypes } from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import FormField from 'components/field/form';
import NavBar from 'components/navbar';
import TagList from 'components/input/taglist';

import './view.scss';

const form = {
  type: 'list',
  valueKey: [],
  extra: { className: 'col-md-10 offset-md-1' },
  children: [
    {
      type: 'text',
      valueKey: ['title'],
      extra: {
        className: 'PaperEdit__Title h3',
        placeholder: 'Title...',
      },
    },
    {
      type: 'textlist',
      valueKey: ['references'],
      extra: {
        className: 'PaperEdit__References',
        placeholder: 'References...',
      },
    },
    {
      type: 'markdown',
      valueKey: ['summary'],
      extra: {
        autoresize: true,
        className: 'PaperEdit__Summary',
        placeholder: 'Summary, in markdown format',
      },
    },
  ],
};

const autoresize = (elt) => {
  elt.style.height = 'auto'; // eslint-disable-line no-param-reassign
  elt.style.height = `${elt.scrollHeight}px`; // eslint-disable-line no-param-reassign
  elt.scrollTop = elt.scrollHeight; // eslint-disable-line no-param-reassign
};
const autoresizeListener = () => {
  if (!this) return;

  autoresize(this);
  window.scrollTo(window.scrollLeft, (this.scrollTop + this.scrollHeight));
};

class PaperEdit extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    paper: ImmutablePropTypes.shape({
      title: ImmutablePropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onTagsChange = ::this.onTagsChange;
  }

  componentDidMount() {
    const resizingTextareas = [].slice.call(document.querySelectorAll('textarea[autoresize]'));
    resizingTextareas.forEach((textarea) => {
      textarea.addEventListener('input', autoresizeListener, false);
      autoresize(textarea);
    });
  }

  onTagsChange(tags) {
    const { onChange, paper } = this.props;
    onChange(paper.set('tags', tags));
  }

  render() {
    const { paper, onChange, onSave } = this.props;
    const tags = paper.get('tags') || List();

    return (
      <div className="PaperEdit container">
        <NavBar
          rightItems={[
            {
              element: (
                <Link
                  className="nav-link"
                  to={paper.get('id') ? `/papers/${paper.get('id')}` : 'papers'}
                >
                  Cancel
                </Link>
              ),
            },
            {
              element: <button className="btn btn-outline-success" onClick={onSave}>Save</button>,
            },
          ]}
        />
        <div className="PaperEdit__Content row">
          <TagList
            className="col-md-10 offset-md-1"
            onChange={this.onTagsChange}
            placeholder="Add tag..."
            value={tags}
          />
          <FormField
            form={form}
            onChange={onChange}
            value={paper}
          />
        </div>
      </div>
    );
  }
}

export default PaperEdit;
