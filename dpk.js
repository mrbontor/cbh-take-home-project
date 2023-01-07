const crypto = require("crypto");

exports.generateHash = (payload) => {
  const ALGORITM = "sha3-512";
  const ENCODE_FORMAT = "hex";

  // payload must be in string format.
  const data = JSON.stringify(payload);
  return crypto.createHash(ALGORITM).update(data).digest(ENCODE_FORMAT);
}


exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  /**
   * set default value 
   * keep the business logic meaning /purpose [TRIVIAL_PARTITION_KEY]
   */
  let candidate = TRIVIAL_PARTITION_KEY;

  /**
   * optimized code on step `checking event value` due to format `clean code`
   * i created a new function, `generateHash` because its called multiple times
   */
  
  if (event) {
    candidate = event.partitionKey ? JSON.stringify(event.partitionKey) : this.generateHash(event)
  }
  
   /**
   * optimize code on step `checking candidate value` due to format `clean code`
   * `if else` statment can be removed, payload has been converted .
   */
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = this.generateHash(candidate)
  }

  return candidate;
};

