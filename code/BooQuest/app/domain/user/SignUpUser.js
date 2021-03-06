import { Firebase } from 'boo-core'
import signInUserWithEmailAndPassword from './signInUserWithEmailAndPassword'

export default async (email, password) => {
    try {
        const user = await Firebase.getInstance().auth().createUserWithEmailAndPassword(email, password)
        await signInUserWithEmailAndPassword(email, password)
    }
    catch (error) {
        let message = ""

        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'This e-mail is already in use.'
                break
            case 'auth/invalid-email':
                message = 'Oops, this is an invalid e-mail.'
                break
            case 'auth/weak-password':
                message = 'This password is sooo weak =/. Please, chose another one.'
            default:
                message = 'Ooops, something wrong here on our side. Please, try again.'
                break
        }

        throw {
            message
        }
    }
}