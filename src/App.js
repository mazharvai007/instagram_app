import React, { useState } from 'react';
import './App.css';
import Post from './Components/Post/Post';

function App() {
	const [posts, setPosts] = useState([
		{
			username: 'John Doe',
			caption: 'Great! It works.',
			imageURL:
				'https://images.unsplash.com/photo-1501163268664-3fdf329d019f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
		},
		{
			username: 'Jane Doe',
			caption: 'Nice picture',
			imageURL:
				'https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
		},
		{
			username: 'Ahmed Abdullah',
			caption: 'Excellent work',
			imageURL:
				'https://images.unsplash.com/photo-1585398999889-2fea45c6cc11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80',
		},
	]);

	return (
		<div className='App'>
			<div className='app__header'>
				<img
					src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
					alt=''
					className='app__headerImage'
				/>
			</div>

			{posts.map((post) => (
				<Post
					username={post.username}
					caption={post.caption}
					imageURL={post.imageURL}
				/>
			))}

			{/* <Post
				username='John Doe'
				caption='Great! It works.'
				imageURL='https://images.unsplash.com/photo-1501163268664-3fdf329d019f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
			/>
			<Post
				username='Jane Doe'
				caption='Nice picture'
				imageURL='https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80'
			/>
			<Post
				username='Ahmed Abdullah'
				caption='Excellent work'
				imageURL='https://images.unsplash.com/photo-1585398999889-2fea45c6cc11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80'
			/> */}
			{/* right content */}
		</div>
	);
}

export default App;
