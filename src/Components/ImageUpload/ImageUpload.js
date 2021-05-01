import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import firebase from 'firebase';
import { db, storage } from '../../firebase';

function ImageUpload({ username }) {
	const [caption, setCaption] = useState('');
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);

	/**
	 *
	 * @param {*} e
	 */
	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	/**
	 * Register three observer
	 * * 'state_changed' observer (Progress), called anytime the state changes
	 * * Error observer, called on failure
	 * * Complete observer, called on successully completion
	 */
	const handleUpload = () => {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes tobe uploaded
				const progressCount = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progressCount);
			},
			(error) => {
				// Error Function
				alert(error.message);
			},
			() => {
				// Completion function
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						// post image inside db
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageURL: url,
							username: username,
						});

						setProgress(0);
						setCaption('');
						setImage(null);
					});
			}
		);
	};

	return (
		<div>
			{/* Caption Input */}
			{/* File Picker */}
			{/* Post button */}
			<progress value={progress} max='100' />
			<input
				type='text'
				placeholder='Enter a caption...'
				onChange={(e) => {
					setCaption(e.target.value);
				}}
				value={caption}
			/>
			<input type='file' onChange={handleChange} />
			<Button className='imageUpload__button' onClick={handleUpload}>
				Upload
			</Button>
		</div>
	);
}

export default ImageUpload;
