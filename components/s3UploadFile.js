import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = process.env.NEXT_PUBLIC_LOCAL_S3_BUCKET;
const REGION = 'eu-west-2';
const accessKeyId = process.env.NEXT_PUBLIC_LOCAL_AWS_ACCESS_KEY;
const secretAccessKey =
  process.env.NEXT_PUBLIC_LOCAL_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const S3UploadFile = (fileObject, folderName = '') => {
  const params = {
    ACL: 'public-read',
    Body: fileObject,
    Bucket: S3_BUCKET,
    Key: folderName + (folderName ? '/' : null) + fileObject.name,
  };

  myBucket.putObject(params).send((err) => {
    if (err) {
      alert(err);
      console.log(err);
    }
  });
};

export default S3UploadFile;
