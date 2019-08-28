import { ForbiddenError } from '../../utililies/respond';


export default {
  origin: (origin, callback) => {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      callback(null, true);
    } else {
      callback(new ForbiddenError('CORS Policy error'));
    }
  },
  methods: [
    'OPTIONS',
    'GET',
    'PUT',
    'POST',
    'PATCH',
    'DELETE',
  ],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Ranges',
    'Cache-Control',
  ],
  exposedHeaders: [
    'Accept-Ranges',
  ],
  maxAge: 60,
  credentials: true,
};
