import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../firebase';
import firebase from 'firebase';

function Post({ postID, user, username, caption, imageURL }) {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');

	useEffect(() => {
		let unsubscribe;

		if (postID) {
			unsubscribe = db
				.collection('posts')
				.doc(postID)
				.collection('comments')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}

		return () => {
			unsubscribe();
		};
	}, [postID]);

	const postComment = (e) => {
		e.preventDefault();

		db.collection('posts').doc(postID).collection('comments').add({
			text: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setComment('');
	};

	return (
		<div className='post'>
			<div className='post__header'>
				<Avatar
					className='poat__avatar'
					alt='JohnDoe'
					src='/static/images/avatar/1.jpg'
				/>
				<h3>{username}</h3>
			</div>

			<img className='post__image' src={imageURL} alt='' />

			<h4 className='post__text'>
				<b>{username} </b>
				{caption}
			</h4>

			{user && (
				<div className='post__comments'>
					{comments.map((comment) => (
						<p>
							<b>{comment.username} </b>: {comment.text}
						</p>
					))}
				</div>
			)}

			{user && (
				<form className='post__commentBox'>
					<input
						type='text'
						className='post__input'
						placeholder='Add a comment...'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<button
						className='post__button'
						disabled={!comment}
						type='submit'
						onClick={postComment}>
						Post
					</button>
				</form>
			)}
		</div>
	);
}

export default Post;
