module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      locations: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Location",
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Path = mongoose.model("Path", schema);

  return Path;
};
