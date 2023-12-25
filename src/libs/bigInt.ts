/*
    Copyright 2018 0kims association.

    This file is part of snarkjs.

    snarkjs is a free software: you can redistribute it and/or
    modify it under the terms of the GNU General Public License as published by the
    Free Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    snarkjs is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
    more details.

    You should have received a copy of the GNU General Public License along with
    snarkjs. If not, see <https://www.gnu.org/licenses/>.
*/

/* global BigInt */
import bigInt from "big-integer";

let wBigInt: any;

if (typeof BigInt != "undefined") {
  wBigInt = BigInt;
  wBigInt.one = wBigInt(1);
  wBigInt.zero = wBigInt(0);

  // Affine
  wBigInt.genAffine = (q: number) => {
    const nq = -q;
    return (a: any) => {
      let aux = a;
      if (aux < 0) {
        if (aux <= nq) {
          aux = aux % q;
        }
        if (aux < wBigInt.zero) {
          aux = aux + q;
        }
      } else {
        if (aux >= q) {
          aux = aux % q;
        }
      }
      return aux.valueOf();
    };
  };

  // Inverse
  wBigInt.genInverse = (q: any) => {
    return (a: any) => {
      let t = wBigInt.zero;
      let r = q;
      let newt = wBigInt.one;
      let newr = wBigInt.affine(a, q);
      while (newr != wBigInt.zero) {
        let q = r / newr;
        [t, newt] = [newt, t - q * newt];
        [r, newr] = [newr, r - q * newr];
      }
      if (t < wBigInt.zero) t += q;
      return t;
    };
  };

  // Add
  wBigInt.genAdd = (q: number) => {
    if (q) {
      return (a: any, b: any) => (a + b) % q;
    } else {
      return (a: any, b: any) => a + b;
    }
  };

  // Sub
  wBigInt.genSub = (q: number) => {
    if (q) {
      return (a: number, b: number) => (a - b) % q;
    } else {
      return (a: number, b: number) => a - b;
    }
  };

  // Neg
  wBigInt.genNeg = (q: number) => {
    if (q) {
      return (a: number) => -a % q;
    } else {
      return (a: number) => -a;
    }
  };

  // Mul
  wBigInt.genMul = (q: number) => {
    if (q) {
      return (a: number, b: number) => (a * b) % q;
    } else {
      return (a: number, b: number) => a * b;
    }
  };

  // Shr
  wBigInt.genShr = () => {
    return (a: number, b: any) => a >> wBigInt(b);
  };

  // Shl
  wBigInt.genShl = (q: number) => {
    if (q) {
      return (a: number, b: any) => (a << wBigInt(b)) % q;
    } else {
      return (a: number, b: any) => a << wBigInt(b);
    }
  };

  // Equals
  wBigInt.genEquals = (q: any) => {
    if (q) {
      return (
        a: { affine: (arg0: any) => any },
        b: { affine: (arg0: any) => any }
      ) => a.affine(q) == b.affine(q);
    } else {
      return (a: any, b: any) => a == b;
    }
  };

  // Square
  wBigInt.genSquare = (q: number) => {
    if (q) {
      return (a: number) => (a * a) % q;
    } else {
      return (a: number) => a * a;
    }
  };

  // Double
  wBigInt.genDouble = (q: number) => {
    if (q) {
      return (a: any) => (a + a) % q;
    } else {
      return (a: any) => a + a;
    }
  };

  // IsZero
  wBigInt.genIsZero = (q: any) => {
    if (q) {
      return (a: { affine: (arg0: any) => any }) =>
        a.affine(q) == wBigInt.zero;
    } else {
      return (a: any) => a == wBigInt.zero;
    }
  };

  // Other minor functions
  wBigInt.prototype.isOdd = function () {
    return (this & wBigInt.one) == wBigInt(1);
  };

  wBigInt.prototype.isNegative = function () {
    return this < wBigInt.zero;
  };

  wBigInt.prototype.and = function (m: number) {
    return this & m;
  };

  wBigInt.prototype.div = function (c: number) {
    return this / c;
  };

  wBigInt.prototype.mod = function (c: number) {
    return this % c;
  };

  wBigInt.prototype.modPow = function (e: any, m: number) {
    let acc = wBigInt.one;
    let exp = this;
    let rem = e;
    while (rem) {
      if (rem & wBigInt.one) {
        acc = (acc * exp) % m;
      }
      exp = (exp * exp) % m;
      rem = rem >> wBigInt.one;
    }
    return acc;
  };

  wBigInt.prototype.greaterOrEquals = function (b: number) {
    return this >= b;
  };

  wBigInt.prototype.greater = function (b: number) {
    return this > b;
  };
  wBigInt.prototype.gt = wBigInt.prototype.greater;

  wBigInt.prototype.lesserOrEquals = function (b: number) {
    return this <= b;
  };

  wBigInt.prototype.lesser = function (b: number) {
    return this < b;
  };
  wBigInt.prototype.lt = wBigInt.prototype.lesser;

  wBigInt.prototype.equals = function (b: any) {
    return this == b;
  };
  wBigInt.prototype.eq = wBigInt.prototype.equals;

  wBigInt.prototype.neq = function (b: any) {
    return this != b;
  };
} else {
  var oldProto = bigInt.prototype;
  wBigInt = function (a: any) {
    if (typeof a == "string" && a.slice(0, 2) == "0x") {
      return bigInt(a.slice(2), 16);
    } else {
      return bigInt(a);
    }
  };
  wBigInt.one = bigInt.one;
  wBigInt.zero = bigInt.zero;
  wBigInt.prototype = oldProto;

  wBigInt.prototype.div = function (c: any) {
    return this.divide(c);
  };

  // Affine
  wBigInt.genAffine = (q: any) => {
    const nq = wBigInt.zero.minus(q);
    return (a: any) => {
      let aux = a;
      if (aux.isNegative()) {
        if (aux.lesserOrEquals(nq)) {
          aux = aux.mod(q);
        }
        if (aux.isNegative()) {
          aux = aux.add(q);
        }
      } else {
        if (aux.greaterOrEquals(q)) {
          aux = aux.mod(q);
        }
      }
      return aux;
    };
  };

  // Inverse
  wBigInt.genInverse = (q: any) => {
    return (a: {
      affine: (arg0: any) => {
        (): any;
        new (): any;
        modInv: { (arg0: any): any; new (): any };
      };
    }) => a.affine(q).modInv(q);
  };

  // Add
  wBigInt.genAdd = (q: any) => {
    if (q) {
      return (a: { add: (arg0: any) => any }, b: any) => {
        const r = a.add(b);
        return r.greaterOrEquals(q) ? r.minus(q) : r;
      };
    } else {
      return (a: { add: (arg0: any) => any }, b: any) => a.add(b);
    }
  };

  // Sub
  wBigInt.genSub = (q: any) => {
    if (q) {
      return (
        a: {
          greaterOrEquals: (arg0: any) => any;
          minus: (arg0: any) => {
            (): any;
            new (): any;
            add: { (arg0: any): any; new (): any };
          };
        },
        b: any
      ) => (a.greaterOrEquals(b) ? a.minus(b) : a.minus(b).add(q));
    } else {
      return (a: { minus: (arg0: any) => any }, b: any) => a.minus(b);
    }
  };

  wBigInt.genNeg = (q: { minus: (arg0: any) => any }) => {
    if (q) {
      return (a: { isZero: () => any }) => (a.isZero() ? a : q.minus(a));
    } else {
      return (a: any) => wBigInt.zero.minus(a);
    }
  };

  // Mul
  wBigInt.genMul = (q: any) => {
    if (q) {
      return (
        a: {
          times: (arg0: any) => {
            (): any;
            new (): any;
            mod: { (arg0: any): any; new (): any };
          };
        },
        b: any
      ) => a.times(b).mod(q);
    } else {
      return (a: { times: (arg0: any) => any }, b: any) => a.times(b);
    }
  };

  // Shr
  wBigInt.genShr = () => {
    return (a: { shiftRight: (arg0: any) => any }, b: any) =>
      a.shiftRight(wBigInt(b).value);
  };

  // Shr
  wBigInt.genShl = (q: any) => {
    if (q) {
      return (
        a: {
          shiftLeft: (arg0: any) => {
            (): any;
            new (): any;
            mod: { (arg0: any): any; new (): any };
          };
        },
        b: any
      ) => a.shiftLeft(wBigInt(b).value).mod(q);
    } else {
      return (a: { shiftLeft: (arg0: any) => any }, b: any) =>
        a.shiftLeft(wBigInt(b).value);
    }
  };

  // Square
  wBigInt.genSquare = (q: any) => {
    if (q) {
      return (a: {
        square: () => {
          (): any;
          new (): any;
          mod: { (arg0: any): any; new (): any };
        };
      }) => a.square().mod(q);
    } else {
      return (a: { square: () => any }) => a.square();
    }
  };

  // Double
  wBigInt.genDouble = (q: any) => {
    if (q) {
      return (a: {
        add: (arg0: any) => {
          (): any;
          new (): any;
          mod: { (arg0: any): any; new (): any };
        };
      }) => a.add(a).mod(q);
    } else {
      return (a: { add: (arg0: any) => any }) => a.add(a);
    }
  };

  // Equals
  wBigInt.genEquals = (q: any) => {
    if (q) {
      return (
        a: {
          affine: (arg0: any) => {
            (): any;
            new (): any;
            equals: { (arg0: any): any; new (): any };
          };
        },
        b: { affine: (arg0: any) => any }
      ) => a.affine(q).equals(b.affine(q));
    } else {
      return (a: { equals: (arg0: any) => any }, b: any) => a.equals(b);
    }
  };

  // IsZero
  wBigInt.genIsZero = (q: any) => {
    if (q) {
      return (a: {
        affine: (arg0: any) => {
          (): any;
          new (): any;
          isZero: { (): any; new (): any };
        };
      }) => a.affine(q).isZero();
    } else {
      return (a: { isZero: () => any }) => a.isZero();
    }
  };
}

wBigInt.affine = function (a: any, q: any) {
  return wBigInt.genAffine(q)(a);
};

wBigInt.prototype.affine = function (q: any) {
  return wBigInt.affine(this, q);
};

wBigInt.inverse = function (a: any, q: any) {
  return wBigInt.genInverse(q)(a);
};

wBigInt.prototype.inverse = function (q: any) {
  return wBigInt.genInverse(q)(this);
};

wBigInt.add = function (a: any, b: any, q: any) {
  return wBigInt.genAdd(q)(a, b);
};

wBigInt.prototype.add = function (a: any, q: any) {
  return wBigInt.genAdd(q)(this, a);
};

wBigInt.sub = function (a: any, b: any, q: any) {
  return wBigInt.genSub(q)(a, b);
};

wBigInt.prototype.sub = function (a: any, q: any) {
  return wBigInt.genSub(q)(this, a);
};

wBigInt.neg = function (a: any, q: any) {
  return wBigInt.genNeg(q)(a);
};

wBigInt.prototype.neg = function (q: any) {
  return wBigInt.genNeg(q)(this);
};

wBigInt.mul = function (a: any, b: any, q: any) {
  return wBigInt.genMul(q)(a, b);
};

wBigInt.prototype.mul = function (a: any, q: any) {
  return wBigInt.genMul(q)(this, a);
};

wBigInt.shr = function (a: any, b: any, q: any) {
  return wBigInt.genShr(q)(a, b);
};

wBigInt.prototype.shr = function (a: any, q: any) {
  return wBigInt.genShr(q)(this, a);
};

wBigInt.shl = function (a: any, b: any, q: any) {
  return wBigInt.genShl(q)(a, b);
};

wBigInt.prototype.shl = function (a: any, q: any) {
  return wBigInt.genShl(q)(this, a);
};

wBigInt.equals = function (a: any, b: any, q: any) {
  return wBigInt.genEquals(q)(a, b);
};

wBigInt.prototype.equals = function (a: any, q: any) {
  return wBigInt.genEquals(q)(this, a);
};

wBigInt.square = function (a: any, q: any) {
  return wBigInt.genSquare(q)(a);
};

wBigInt.prototype.square = function (q: any) {
  return wBigInt.genSquare(q)(this);
};

wBigInt.double = function (a: any, q: any) {
  return wBigInt.genDouble(q)(a);
};

wBigInt.prototype.double = function (q: any) {
  return wBigInt.genDouble(q)(this);
};

wBigInt.isZero = function (a: any, q: any) {
  return wBigInt.genIsZero(q)(a);
};

wBigInt.prototype.isZero = function (q: any) {
  return wBigInt.genIsZero(q)(this);
};

wBigInt.leBuff2int = function (buff: string | any[]) {
  let res = wBigInt.zero;
  for (let i = 0; i < buff.length; i++) {
    const n = wBigInt(buff[i]);
    res = res.add(n.shl(i * 8));
  }
  return res;
};

wBigInt.leInt2Buff = function (n: any, len: number) {
  let r = n;
  let o = 0;
  const buff = Buffer.alloc(len);
  while (r.greater(wBigInt.zero) && o < buff.length) {
    let c = Number(r.and(wBigInt("255")));
    buff[o] = c;
    o++;
    r = r.shr(8);
  }
  if (r.greater(wBigInt.zero))
    throw new Error("Number does not feed in buffer");
  return buff;
};

wBigInt.prototype.leInt2Buff = function (len: any) {
  return wBigInt.leInt2Buff(this, len);
};

export default wBigInt;
