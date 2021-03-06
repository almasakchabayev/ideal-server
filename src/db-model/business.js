import thinky, { type } from './thinky';

const Business = thinky.createModel('Business', {
  name: type.string(),
  city: type.string(),
  street: type.string(),
  phones: type.array(),
  schedule: type.array(),
  image: type.string(),
  idAdmin: type.string()
});

Business.plural = 'businesses';

export default Business;
