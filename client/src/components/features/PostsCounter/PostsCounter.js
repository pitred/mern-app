import React from 'react';
import { PropTypes } from 'prop-types';

class PostsCounter extends React.Component {
   render() {
      const { postsCount } = this.props;

      return <div>Posts amount: {postsCount > 0 ? postsCount : 'no posts'}</div>;
   }
}

PostsCounter.propTypes = {
   posts: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
         content: PropTypes.string.isRequired
      })
   ),
   loadPosts: PropTypes.func.isRequired
};

export default PostsCounter;
