import { connect } from 'react-redux';
import { getRequest, getSinglePost, loadSinglePostRequest, resetRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';

const mapStateToProps = state => ({
   singlePost: getSinglePost(state),
   request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
   loadSinglePost: id => dispatch(loadSinglePostRequest(id)),
   resetRequestStatus: () => dispatch(resetRequest())
});

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SinglePost);
