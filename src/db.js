import { credentials } from '../config/credentials'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp(credentials)

export const db = firebase.firestore()

// Export types that exists in Firestore
export const { TimeStamp } = firebase.firestore
