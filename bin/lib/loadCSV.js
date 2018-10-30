
const USER_PATH = process.cwd()

module.exports = csvPath => {
    if (!csvPath) throw new ReferenceError('CSV PATH is NOT FOUND!!!')
    const spinner = require('ora')().start('Loading Data from CSV...')
    const data = require('csvtojson')().fromFile(`${USER_PATH}/${csvPath}`)
    spinner.succeed(`Data from CSV ${csvPath} is ready !`)
    return data
}
