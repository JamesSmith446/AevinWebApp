import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//redux
import actions from '../../redux/actions';
import { connect } from 'react-redux';
// icons
import CommentIcon from '@material-ui/icons/Comment';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    commentContainer: {
      // display: 'flex'
    },
    container: {
      marginTop: 15
    },
    avatar: {
        width: 50,
        borderRadius: '50%'
    }, 
    commentsInfo: {
      display: 'flex',
      color: theme.palette.primary.dark,
    }
  }))

const Comments = ({ postId, postComments, match, index, selectedPost }) => {
  const classes = useStyles();

  const [comments, setComments] = useState([postComments]);

  useEffect(() => {
    console.log('render')
  }, [comments, postComments])

  return (
    <div className={classes.commentContainer}>
      {
      !match ? 
      (<Link 
        to= {{ pathname: `/post/${postId}`, state: {index: index} }} className={classes.commentsInfo}>
        <CommentIcon /> 
        <Typography>
          {postComments.length} comments
        </Typography>
      </Link>)
    : (
      <div className={classes.commentsInfo}>
        <CommentIcon /> 
        <Typography>
          {postComments.length} comments
        </Typography>
      </div>
    )}

    {
      match && postComments.map((comment) => <Comment key={comment.id} comment={comment} parentId={comment.id} />)
    } 
   {match && <CreateComment parentId={postId} /> }
    </div>
  );
};


const mapStateToProps = state => {
  return {
      selectedPost: state.selectedPost
  }
}

const mapDispatchToProps =  {
  // createComment: actions.createComment
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
