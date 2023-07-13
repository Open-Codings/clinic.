module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      description: String,
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "medicines" },
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

  const MedApp = mongoose.model("medapps", schema);
  return MedApp;
};
