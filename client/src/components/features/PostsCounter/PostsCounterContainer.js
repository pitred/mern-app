import { connect } from 'react-redux';
import { getNumberOfPosts, getRequest, loadPostsRequest } from '../../../redux/postsRedux';
import PostsCounter from './PostsCounter';

const mapStateToProps = state => ({
   postsCount: getNumberOfPosts(state),
   request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
   loadPosts: () => dispatch(loadPostsRequest())
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PostsCounter);
