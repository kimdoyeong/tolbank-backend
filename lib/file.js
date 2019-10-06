const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const File = require("../model/File");
const token = require("./token");
const PATH = process.env.FILE_PATH || "S:\\";

const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

exports.getFiles = async (_id, id, filepath) => {
  const userPath = path.join(PATH, id);

  if (!(await exists(userPath))) {
    await mkdir(userPath);
  }
  const _filepath = path.join(userPath, filepath);
  const files = await readdir(_filepath);

  let data = [];

  for (const file of files) {
    const _path = path.join(_filepath, file);
    const _stat = await stat(_path);
    const slug = path.join(filepath, file).replace(/\\/g, "/");

    const modelData = await File.findOne({
      slug
    });

    if (!modelData) {
      await new File({
        slug,
        path: _path,
        owner: _id
      }).save();
    }
    const _data = {
      type: _stat.isDirectory() ? "folder" : "file",
      size: _stat.size,
      birthtime: _stat.birthtime,
      uid: _stat.uid,
      filename: file,
      slug
    };
    data.push(_data);
  }

  return data.sort((a, b) => {
    let c = 0;
    if (a.type === "folder") {
      c--;
    }
    if (b.type === "folder") {
      c++;
    }
    return c;
  });
};

exports.getFilePath = async _token => {
  const { owner, slug } = await token.verify(_token);

  const file = await File.findOne({ owner, slug }).populate("owner", [
    "id",
    "_id"
  ]);

  if (!file) {
    return null;
  }
  return path.join(PATH, file.owner.id, file.slug);
};

exports.fileExists = async (user, slug) => {
  const file = path.join(PATH, user.id, slug);

  return await exists(file);
};

exports.getToken = async (user, slug) => {
  const file = await File.findOne({
    owner: user._id,
    slug
  });

  if (!file) return null;
  const _token = await token.sign(file.toObject(), {
    expiresIn: "10h"
  });

  return _token;
};
