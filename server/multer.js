const path = require('path');
const multer=require('multer');

const storage =multer.diskStorage({
    destination : (req,file,cb)=>{
      cb(null,'/REST-API-endpoint/Server/images')
    },
    filename: (req,file,cb)=>{
      console.log(file);
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  exports. upload = multer({storage:storage}).single('image_url');