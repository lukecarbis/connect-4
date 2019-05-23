import { credentials } from '../config/credentials'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp(credentials)

const db = firebase.firestore()

export { db }