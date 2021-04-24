import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Components/Post/Post';
import { db } from './firebase';

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection('posts').onSnapshot((snapshot) => {
			// Added new post everytime when the is fire
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}))
			);
		});
	}, []);

	return (
		<div className='App'>
			<div className='app__header'>
				<img
					src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
					alt=''
					className='app__headerImage'
				/>
			</div>

			{posts.map(({ id, post }) => (
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imageURL={post.imageURL}
				/>
			))}

			{/* right content */}
		</div>
	);
}

export default App;
