import React from 'react';

import PageTitle from '../../common/PageTitle/PageTitle';
import SinglePostContainer from '../../features/SinglePost/SinglePostContainer';

const SinglePost = props => (
   <div>
      <PageTitle>Single post</PageTitle>
      <SinglePostContainer id={props.match.params.id} />
   </div>
);

export default SinglePost;
