/* eslint-disable no-console */
export default function Shuttle() {
  this.params = {};
  this.query = {};
  this.data = {};
  this.requester = {};

  this.mapData = (fn) => {
    const s = new Shuttle();
    s.data = fn(this.data);
    s.params = this.params;
    s.query = this.query;
    return Promise.resolve(s);
  };

  this.mapParams = (fn) => {
    const s = new Shuttle();
    s.data = this.data;
    s.params = fn(this.data);
    s.query = this.query;
    return Promise.resolve(s);
  };

  this.mapQuery = (fn) => {
    const s = new Shuttle();
    s.data = this.data;
    s.params = this.params;
    s.query = fn(this.data);
    return Promise.resolve(s);
  };
}

Shuttle.prototype = Object.create(Shuttle.prototype);
Shuttle.prototype.constructor = Shuttle;

Shuttle.liftData = (data) => {
  const s = new Shuttle();
  s.data = data;
  return Promise.resolve(s.data);
};

Shuttle.liftRequest = (req) => {
  const s = new Shuttle();
  s.params = req.params;
  s.data = req.body;
  s.rawData = req.rawBody;
  s.query = req.query;
  s.requester = req.user;
  s.session = req.session || {}; // empty object for e2e tests
  // eslint-disable-next-line no-underscore-dangle
  s.session._sid = req.sessionID;
  return Promise.resolve(s);
};

Shuttle.liftSideEffectFunction = (data, callback, reqKeys) => {
  const keys = [...reqKeys];
  console.log(keys, 'keyssss');
  if (keys.length > 0) {
    keys.forEach((key) => {
      callback(data[key], key);
    });
  }
  console.log(data, 'dataaa');
  return data;
};
