const checksFields = (recivedFields, requiredFields) => {
  const areValidFields = recivedFields.every((field) => requiredFields.includes(field));

  return areValidFields;
};

module.exports = {
  checksFields,
};
