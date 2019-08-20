import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import Spinner from '../../common/Spinner/Spinner';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import Alert from '../../common/Alert/Alert';
import HtmlBox from '../../common/HtmlBox/HtmlBox';

class SinglePost extends React.Component {
   componentDidMount() {
      const { loadPost, match } = this.props;
      loadPost(match.params.id);
   }

   render() {
      const { post, request } = this.props;

      if (request.pending === true || request.success === null) return <Spinner />;
      if (request.pending === false && request.error != null) return <Alert>{request.error.message}</Alert>;
      if (request.pending === false && request.success === true && !post) return <Alert>No post</Alert>;
      if (request.pending === false && request.success === true && post)
         return (
            <div>
               <SmallTitle>{post.title}</SmallTitle>
               <HtmlBox>{post.content}</HtmlBox>
               <p>Author: {post.author}</p>
            </div>
         );
   }
}

SinglePost.propTypes = {
   posts: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
         content: PropTypes.string.isRequired,
         author: PropTypes.string.isRequired
      })
   ),
   loadPosts: PropTypes.func.isRequired
};

export default withRouter(props => <SinglePost {...props} />);
