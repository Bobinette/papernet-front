import React, { PropTypes } from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import FormField from 'components/field/form';
import TagList from 'components/input/taglist';

import './view.scss';

const form = {
  type: 'list',
  valueKey: [],
  children: [
    {
      type: 'text',
      valueKey: ['title'],
      extra: {
        className: 'PaperEdit__Title',
        placeholder: 'Title...',
      },
    },
    {
      type: 'markdown',
      valueKey: ['summary'],
      extra: {
        className: 'PaperEdit__Summary',
        placeholder: 'Summary, in markdown format',
      },
    },
  ],
};

const PaperEdit = ({ onChange, onDelete, onSave, paper }) => {
  const tags = paper.get('tags') || List();

  return (
    <div className="PaperEdit">
      <div className="PaperEdit__LeftPanel">
        <div className="PaperEdit__LeftPanel__TopLinks">
          <Link to={paper.get('id') ? `/papers/${paper.get('id')}` : 'papers'}>
            <i className="mdi mdi-close" />Cancel
          </Link>
          <button onClick={onSave}><i className="mdi mdi-check" />Save</button>
        </div>
        <div className="PaperView__LeftPanel__Tags">
          <h3 className="PaperView__LeftPanel__TagsLabel"><i className="mdi mdi-tag" />Tags:</h3>
          <TagList
            onChange={(newTags) => { onChange('tags', newTags); }}
            placeholder="Add tag..."
            value={tags}
          />
        </div>
        <div className="PaperEdit__LeftPanel__SpaceHolder" />
        <div className="PaperEdit__LeftPanel__BottomLinks">
          <button onClick={onDelete}><i className="mdi mdi-delete" />Delete</button>
        </div>
      </div>
      <div className="PaperEdit__Content">
        <FormField
          form={form}
          onChange={onChange}
          value={paper}
        />
      </div>
    </div>
  );
};

PaperEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  paper: ImmutablePropTypes.shape({
    title: ImmutablePropTypes.string,
  }).isRequired,
};

export default PaperEdit;
