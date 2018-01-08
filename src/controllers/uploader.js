"use strict";


const fs = require ('fs');
const Dropbox = require ('dropbox');
var multer = require ('multer');
var upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage ({

  'destination': (req, file, cb) => cb (null, '/tmp/'),

  'filename': (req, file, cb) => {
    const extension = file.originalname.split ('.')[1];
    cb (null, file.fieldname + '-' + Date.now () + '.' + extension);
  }
});

const clientDropbox = new Dropbox({

 accesToken: 'Mrh4ZePmeXAAAAAAAAAACg11SIfBi1NQe8-k6DnAlUOTJccxVfzl4_SFiX6ayX6v'
});


module.exports = function upload (params) {

  let service = params.service;
  let file = params.file;
  return new Promise ( (resolve, reject) => {

    if (!file) resolve({file: null, thumbnail: null});

    fs.readFile ('/tmp/' + file.filename, (error, data) => {

      if (error) return reject (error);
      if (service === 'dropbox') {

        clientDropbox.writeFile (file.filename, data, (error, stat) => {

          const isPNG = stat.mimeType.split ('/')[1] === 'png';

          clientDropbox.revisions (stat.path, {png: isPNG}, error => {

            if (error) return reject (error);
            const thumbnail = clientDropbox.thumbnailUrl (stat.path);
            const file = thumbnail.replace ('thumbnails', 'files');
            resolve ({file: file, thumbnail: thumbnail});
          });
        });
      }
    });
  });
};

module.exports.multer = multer ({storage});

//
