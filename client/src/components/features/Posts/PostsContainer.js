import { connect } from 'react-redux';
import { getRequest, getPosts, getNumberOfPosts, loadPostsByPageRequest, getPages, resetRequest, getPresentPage } from '../../../redux/postsRedux';
import Posts from './Posts';

const mapStateToProps = state => ({
   posts: getPosts(state),
   request: getRequest(state),
   postsNumber: getNumberOfPosts(state),
   pages: getPages(state),
   presentPage: getPresentPage(state)
});

const mapDispatchToProps = dispatch => ({
   loadPostsByPage: (page, postsPerPage) => dispatch(loadPostsByPageRequest(page, postsPerPage)),
   resetRequestStatus: () => dispatch(resetRequest())
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Posts);
