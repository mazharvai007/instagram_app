import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imageURL }) {
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
			{/* image */}

			<h4 className='post__text'>
				<b>Mazhar: </b>
				{caption}
			</h4>
			{/* username / caption */}
		</div>
	);
}

export default Post;
