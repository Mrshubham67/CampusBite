function pickRequestFields(body, allowedFields) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const error = new Error('Request body must be a JSON object.')
    error.statusCode = 400
    throw error
  }

  return allowedFields.reduce((fields, field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      fields[field] = body[field]
    }
    return fields
  }, {})
}

module.exports = pickRequestFields