// Add the required modules
var path = require('path');
var fs = require('fs');
var join = path.join;
var Photos = require('../models/photos');


// Function to get the upload form
function getUploadForm(req, res, next) {
  res.render('uploads', {
    title: 'Photo upload form'
  });
};

// Function to handle the upload
function uploadImage(dir) {

  // This is middleware so we have the middleware parameters
  // The file are already parsed with the parseBody middleware
  return function (req, res, next) {

    var img = req.file, // Get the images - if any
      name = img.originalname, // Get the image name
      path = join(dir, img.originalname); // Set the path where to store the image = dir+imgName
    // console.log(dir)

    // Use the fs module to create and save the file
    fs.rename(
      img.path, // Old path
      path, // New path
      function (err) { // callback

        // Check to see if there wa any error while trying to move the image around
        if (err) {
          return next(err);
        }

        // Add the Photo to our DB 
        Photos.create({
            name: name,
            path: name
          },
          function (err) {
            // If there was an error while trying to add the image to the model
            // "skip" to the next middleware
            if (err) {
              return next(err);
            }
            // Display the images gallery page
            res.redirect('/');
          });
      });

  };
}

// Expose the public methods
module.exports = {
  // listImages: listImages,
  uploadImage: uploadImage,
  getUploadForm: getUploadForm
};