import { expect } from 'chai';
import falcor from 'falcor';
import _ from 'lodash';
import ServerRouter from '../../src/server-model/server-router';
import db from '../../src/db-model';

describe('tagsByText serverModel', function describe() {
  let model;
  let testTag1;
  let testTag2;
  let testTag3;
  let testTag4;
  let testTag5;
  let testTag6;
  before(function before() {
    model = new falcor.Model({
      source: new ServerRouter(),
      maxSize: 0
    });
    testTag1 = new db.models.Tag({
      text: 'coffe'
    });
    testTag2 = new db.models.Tag({
      text: 'Coffee house'
    });
    testTag3 = new db.models.Tag({
      text: 'Mr coffee'
    });
    testTag4 = new db.models.Tag({
      text: 'coffemania'
    });
    testTag5 = new db.models.Tag({
      text: 'asdfasdf'
    });
    testTag6 = new db.models.Tag({
      text: 'werwqerqwer'
    });
    return testTag1.save().then(() =>
        testTag2.save().then(() =>
          testTag3.save().then(() =>
            testTag4.save().then(() =>
              testTag5.save().then(() =>
                testTag6.save()
              )
            )
          )
        )
      );
  });
  after(function after() {
    return testTag1.delete().then(() =>
        testTag2.delete().then(() =>
          testTag3.delete().then(() =>
            testTag4.delete().then(() =>
              testTag5.delete().then(() =>
                testTag6.delete()
              )
            )
          )
        )
      );
  });
  it(`tagsByText['coffe'][0..20]`, function test() {
    return model.get(['tagsByText', 'coffe', { from: 0, to: 20 }]).
    then(res => {
      const result = _.values(res.json.tagsByText.coffe);
      expect(result.length).to.equal(5); // - $__path
      expect(result[0][1]).to.equal(testTag1.id);
      expect(result[3][1]).to.equal(testTag3.id);
    });
  });
});
