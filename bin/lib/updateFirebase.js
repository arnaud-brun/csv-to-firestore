module.exports = (ref, data, mapper) => {
    const ora = require('ora')()
    let spinner = ora.start('Transfering your data to Firebase...')
    data.map(data => ref.doc().set(mapper ? mapper(data) : data))
    spinner.succeed('Firebase Data Transfer Successful !')
}
