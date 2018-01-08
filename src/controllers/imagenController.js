"use strict";
const Photo = require("../collections/photo");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const randomstring = require("randomstring");

module.exports.create=function(req, res) {
		const form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {

			let data = fields;
			data.photo = path.join("uploads/", files.photo.name);
			console.log(data);

      Photo.create(data)
				.then((err,result) => {
					if(err) return res.status(500).send(err);
					data.type = "";
					console.log(result);
					return res.send();
				});
		});
		form.on("error", function(err) {
			return res.send(null, 500);
		});

		form.on("fileBegin", function(name, file) {
			let rdName = randomstring.generate();
			rdName = rdName.replace("/", "");
			let originalName = file.name;
			file.name = rdName + path.extname(originalName);
		});

		form.on("end", function(fields, files) {
			const temp_path = this.openedFiles[0].path;
			const file_name = this.openedFiles[0].name;
			const new_location = path.join(__dirname, "../public/uploads/", file_name);

			fs.copy(temp_path, new_location, function(err) {
				if (err) {
					console.error(err);
				} else {
					console.log("success!")
				}
			});
		});

	}

	module.exports.getPhotos = function (req,res) {
	    Photo.find({})
	    .exec(function (err,user) {
	      if(err) return res.sendStatus(503);
	      return res.json(user);
	    });
	}
