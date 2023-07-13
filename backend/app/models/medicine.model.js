module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      code: String,
      name: String,
      stock: Number,
      price: String,
      unit: String,
      expireDate: Date,
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  const Medicine = mongoose.model("medicines", schema);
  return Medicine;
};
