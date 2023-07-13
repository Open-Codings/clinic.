module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: String,
      name: String,
      role: Number,
      email: String,
      password: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  const User = mongoose.model("users", schema);
  return User;
};
