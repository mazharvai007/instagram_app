import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
	apiKey: 'AIzaSyB27gp_6fr6-XT7QMp31Hpd19kVEMaL8Xo',
	authDomain: 'instagramapp-2b4d9.firebaseapp.com',
	projectId: 'instagramapp-2b4d9',
	storageBucket: 'instagramapp-2b4d9.appspot.com',
	messagingSenderId: '226668381072',
	appId: '1:226668381072:web:ba3acf15db3c06c1e5a915',
	measurementId: 'G-NF271Y0B88',
});

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
