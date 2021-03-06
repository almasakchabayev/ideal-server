import { expect } from 'chai';
import falcor from 'falcor';
import ServerRouter from '../../src/server-model/server-router';
import db from '../../src/db-model';

describe('tagsById', function describe() {
  let model;
  let testTag1;
  let testTag2;
  before(function before() {
    model = new falcor.Model({
      source: new ServerRouter(),
      maxSize: 0
    });
    testTag1 = new db.models.Tag({
      text: 'asdfasdf'
    });
    testTag2 = new db.models.Tag({
      text: 'asdfsadfasdf'
    });
    return testTag1.save().then(() =>
        testTag2.save()
    );
  });
  after(function after() {
    return testTag1.delete().then(() =>
      testTag2.delete()
    );
  });
  it(`tagsById['1f6527f3-c99d-4ff0-b31f-09cb793b966f'].text`, function test() {
    return model.get(['tagsById', testTag1.id, 'text']).
    then(res => {
      expect(
        res.json.tagsById[testTag1.id].text
      ).to.equal(testTag1.text);
    });
  });
  it(`tagsById[{keys:tagIds}].text`, function test() {
    return model.get([
      'tagsById',
      [testTag1.id, testTag2.id],
      'text'
    ]).
    then(res => {
      expect(
        res.json.tagsById[testTag1.id].text
      ).to.equal(testTag1.text);
      expect(
        res.json.tagsById[testTag2.id].text
      ).to.equal(testTag2.text);
    });
  });
  // TODO test errors
});
