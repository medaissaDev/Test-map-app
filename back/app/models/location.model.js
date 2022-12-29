module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      location: {
        type: {
          type: String,
          default: "Point",
          required: true,
        },
        coordinates: {
          type: JSON,
          required: true,
        },
      },
      path: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Path",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Location = mongoose.model("Location", schema);

  return Location;
};
