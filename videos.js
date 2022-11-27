const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema({
  title: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  tags: [
    new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
    }),
  ],
});

module.exports = mongoose.model("Videos", VideosSchema);
