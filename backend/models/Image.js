const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    // Ownership
    sessionId: {
      type: String,
      required: true,
      index: true
    },

    // Storage
    s3Key: {
      type: String,
      required: true,
      unique: true
    },

    originalName: String,
    mimeType: { type: String, index: true },
    sizeBytes: { type: Number, index: true },

    // Time
    takenAt: { type: Date, index: true },

    // People tagging (future-proof)
    people: [
      {
        personId: String,
        confidence: Number
      }
    ],

    // Location
    location: {
      city: { type: String, index: true },
      state: { type: String, index: true },
      country: { type: String, index: true }
    },

    // Deduplication
    hash: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },

    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);