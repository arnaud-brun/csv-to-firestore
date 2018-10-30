
const USER_PATH = process.cwd()

module.exports = (firebaseConfig) => {
    const ora = require('ora')()

    if (!firebaseConfig) throw new ReferenceError('Firebase Config is NOT FOUND!!!')
    const { credential, collection } = firebaseConfig

    if (!credential) throw new ReferenceError('Firebase Credential is MISSING !!!')
    if (!collection) throw new ReferenceError('Firebase Collection is MISSING !!!')
    
    let spinner = ora.start('Initialize Firebase Admin...')
    const admin = require('firebase-admin')
    const serviceAccount = require(`${USER_PATH}/${credential}`)
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    const firestore = admin.firestore()
    firestore.settings({timestampsInSnapshots: true})
    spinner.succeed('Firebase Admin is ready !')

    const ref = firestore.collection(collection)
    return ref
}
