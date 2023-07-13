module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      code: String,
      preserveDate: Date,
      name: String,
      gender: String,
      placeBirth: String,
      dateBirth: Date,
      phone: String,
      address: String,
      city: String
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

  const Patient = mongoose.model("patients", schema);
  return Patient;
};
