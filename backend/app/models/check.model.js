module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      temperature: String,
      weight: String,
      complaint: String,
      patient: { type: mongoose.Schema.Types.ObjectId, ref: "patients" },
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

  const Check = mongoose.model("checks", schema);
  return Check;
};
