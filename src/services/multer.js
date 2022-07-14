const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files')
  },
  filename: function (req, file, cb) {
    const nombre = req.body.nombre
    cb(null, `${nombre}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

module.exports = upload

