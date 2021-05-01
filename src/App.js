import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './App.css';
import Post from './Components/Post/Post';
import { db, auth } from './firebase';
import { Button, FormControl, Input } from '@material-ui/core';
import ImageUpload from './Components/ImageUpload/ImageUpload';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	/**
	 * Users Authentication
	 */
	useEffect(() => {
		// Get the currently signed-in user
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// User is signed in
				setUser(authUser);

				// Profile update and display Username
				// if (authUser.displayName) {
				// 	// do not update username
				// } else {
				// 	// Update profile
				// 	return authUser.updateProfile({
				// 		displayName: username,
				// 	});
				// }
			} else {
				// No user is signed out
				setUser(null);
			}
		});

		return () => {
			// Perform some cleanup actions
			unsubscribe();
		};
	}, [user, username]);

	/**
	 * Posts
	 */
	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				// Added new post everytime when the is fire
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						post: doc.data(),
					}))
				);
			});
	}, []);

	/**
	 * * Sign up user with email and password on firebase
	 * @param {*} e
	 */
	const signUp = (e) => {
		e.preventDefault();

		// Create a password-based account on firebase
		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				// Profile update and display username
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));
	};

	/**
	 * * Sign In user with registerd email and password on firebase
	 * @param {*} e
	 */
	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password).catch((error) =>
			alert(error.message)
		);

		// Modal will be closed after sign in
		setOpenSignIn(false);
	};

	return (
		<div className='App'>
			{/* Sign In, Sign Up, Logout */}
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<center>
						<img
							src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
							alt=''
							className='app__headerImage'
						/>
						<form className='app__signup'>
							<FormControl>
								<Input
									type='text'
									placeholder='Username'
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<Input
									type='text'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<Button type='submit' onClick={signUp}>
									Sign Up
								</Button>
							</FormControl>
						</form>
					</center>
				</div>
			</Modal>
			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<center>
						<img
							src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
							alt=''
							className='app__headerImage'
						/>
						<form className='app__signin'>
							<FormControl>
								<Input
									type='text'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<Button type='submit' onClick={signIn}>
									Sign In
								</Button>
							</FormControl>
						</form>
					</center>
				</div>
			</Modal>

			{/* App Header */}
			<div className='app__header'>
				<a href='/'>
					<img
						src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
						alt=''
						className='app__headerImage'
					/>
				</a>
				{/* User Authentication */}
				{user ? (
					<Button onClick={() => auth.signOut()}>Logout</Button>
				) : (
					<div className='app__loginContainer'>
						<Button onClick={() => setOpenSignIn(true)}>
							Sign In
						</Button>
						<Button onClick={() => setOpen(true)}>Sign Up</Button>
					</div>
				)}
			</div>

			{/* Posts */}
			{posts.map(({ id, post }) => (
				<Post
					key={id}
					username={post.username}
					caption={post.caption}
					imageURL={post.imageURL}
				/>
			))}

			{/* right content */}

			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Sorry you need to login to upload</h3>
			)}
		</div>
	);
}

export default App;
