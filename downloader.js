/**
 * this is a downloader for download screen-editor uploaded files
 */

// set base url if needed
const baseUrl = ''
// modify url lists in urls.js
const list = require('./urls.js')
// set cookie here if needed
const cookie = ''
// modify download path if needed
const PATH = '.\\download\\'

const fs = require('fs')

// check if download folder exists,
// if not, create it
try {
  fs.statSync(PATH)
} catch (e) {
  fs.mkdirSync(PATH)
}

const axios = require('axios')
axios.defaults.timeout = 60000
axios.defaults.withCredentials = true

list.forEach(path => {
  const slashIndex = path.lastIndexOf('/') + 1
  const filename = path.substr(slashIndex)
  const dir = path.substr(0, slashIndex)

  axios
    .request({
      url: baseUrl + dir + encodeURIComponent(filename),
      method: 'get',
      // use 'arraybuffer' in case there may have some binary files (e.g. fonts)
      responseType: 'arraybuffer',
      headers: {
        Cookie: cookie,
      },
    })
    .then(result => {
      fs.writeFileSync(PATH + filename, result.data)

      console.log(filename, 'complete')
    })
    .catch(error => console.error(filename + ': ' + error))
})
