import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends React.Component {
   // new add
   state = {
      initialPage: this.props.initialPage || 1,
      postsPerPage: this.props.postsPerPage || 10,
      pagination: this.props.pagination
   };
   //
   componentDidMount() {
      const { loadPostsByPage, resetRequestStatus } = this.props; // new add
      const { initialPage, postsPerPage } = this.state; // new add
      resetRequestStatus(); // new add
      loadPostsByPage(initialPage, postsPerPage); // new add
   }

   loadPostsPage = page => {
      const { loadPostsByPage } = this.props;
      const { postsPerPage } = this.state; // new add
      loadPostsByPage(page, postsPerPage); // new add
   };

   render() {
      const { pagination, postsPerPage } = this.state; // new add
      const { posts, request, postsNumber, pages, presentPage } = this.props;
      const { loadPostsPage } = this;

      if (request.pending === false && request.success === true && postsNumber > 0 && !pagination) {
         return (
            <div>
               <PostsList posts={posts} />
            </div>
         );
      } else if (request.pending === false && request.success === true && postsNumber > 0 && pagination) {
         return (
            <div>
               <PostsList posts={posts} />
               <Pagination pages={pages} initialPage={presentPage} onPageChange={loadPostsPage} postsPerPage={postsPerPage} />
            </div>
         );
      } else if (request.pending === true && request.success === null) {
         return (
            <div>
               <Spinner />
            </div>
         );
      } else if (request.pending === false && request.error != null) {
         return (
            <div>
               <Alert variant='error'>{request.error.message}</Alert>;
            </div>
         );
      } else if (request.pending === false && request.success === true && postsNumber === 0) {
         return (
            <div>
               <Alert variant='info'>No posts</Alert>
            </div>
         );
      } else {
         return <div />;
      }
   }
}

Posts.propTypes = {
   posts: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
         content: PropTypes.string.isRequired,
         author: PropTypes.string.isRequired
      })
   ),
   request: PropTypes.object.isRequired,
   postsNumber: PropTypes.number.isRequired,
   loadPostsByPage: PropTypes.func.isRequired,
   resetRequestStatus: PropTypes.number.isRequired,
   presentPage: PropTypes.number.isRequired,
   initialPage: PropTypes.number,
   postsPerPage: PropTypes.number,
   pagination: PropTypes.bool
};

export default Posts;
