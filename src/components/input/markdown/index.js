import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import TextArea from 'components/input/textarea';
import Markdown from 'components/markdown';

import './markdown.scss';

class MarkdownInput extends Component {
  static propTypes = {
    autoresize: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    autoresize: false,
    className: '',
    placeholder: '',
    value: '',
  }

  constructor(props) {
    super(props);

    this.onEdit = ::this.onEdit;
    this.onPreview = ::this.onPreview;

    this.state = { preview: false };
  }

  onPreview() {
    this.setState({ preview: true });
  }

  onEdit() {
    this.setState({ preview: false });
  }

  renderTabs() {
    const { preview } = this.state;

    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={classNames('nav-link btn btn-link', { active: !preview })}
            onClick={this.onEdit}
          >
            Edit
          </button>
        </li>
        <li className="nav-item">
          <button
            className={classNames('nav-link btn btn-link', { active: preview })}
            onClick={this.onPreview}
          >
            Preview
          </button>
        </li>
      </ul>
    );
  }

  render() {
    const { autoresize, className, onChange, placeholder, value } = this.props;
    const { preview } = this.state;

    return (
      <div className={`MarkdownInput ${className}`}>
        {this.renderTabs()}
        {preview ?
          <Markdown text={value} />
          :
          <TextArea
            autoresize={autoresize}
            className="MarkdownInput__TextArea"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
        }
      </div>
    );
  }
}

export default MarkdownInput;
