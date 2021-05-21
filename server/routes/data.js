const express = require('express');
const { ClientError, ServerError } = require('../errors');
const router = express.Router();
const { IncomingForm } = require('formidable');
const path = require('path');

router.get('/createFile', (req, res) => {
  const fs = require('fs');

  const writeStream = fs.createWriteStream('./data/dynamic_file.txt');
  writeStream.write('Hi,  Users. I am generated after the /createFile get request. ');
  writeStream.write('Thank You.');
  writeStream.end();
  res.send(writeStream);
});

router.post('/upload', (req, res, next) => {
  const form = new IncomingForm({ maxFileSize: 26215000 });
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log('err', err);
      return next(err);
    }
    if (typeof require !== 'undefined') XSLX = require('xlsx');
    // console.log('files.file', files.file);
    try {
      const wb = {};
      const workbook = XSLX.readFile(files.file.path);
      for (const sheetName of workbook.SheetNames) {
        wb[sheetName] = XSLX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      }
      console.log('wb', wb);

      return res.status(200).json('form ok');


      ;
    } catch (error) {
      console.log('catch');
      next(error);
    }
    // console.log('fields', fields);
    // console.log('files', files);
  });
});

router.post('/test', (req, res, next) => {
  const body = req.body;
  // console.log('body', body);
  setTimeout(() => res.status(200).json(body), 2000);
  // return res.status(200).json(body);
  // return next(new ClientError());
});

module.exports = router;
