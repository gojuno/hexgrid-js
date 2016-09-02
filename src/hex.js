function Hex(q, r) {
  this.q = q;
  this.r = r;
}

Hex.prototype.getQ = function () {
  return this.q;
}

Hex.prototype.getR = function () {
  return this.r;
}

Hex.prototype.getS = function () {
  return this.q.add(this.r).negate();
}

module.exports = Hex;
