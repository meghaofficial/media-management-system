const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    default: `Folder-${folderSchema.length + 1}`,
  },
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  icon: {
    type: String,
    default: "folder",
  },
  isDeleted: {
    type: Boolean,
    default: false,
    index: true,
  },
}, { timestamps: true });

module.exports = new mongoose.model("Folder", folderSchema);
