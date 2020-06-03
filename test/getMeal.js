'use strict'
const chai = require('chai');
const index = require('../dist');

const { assert, expect } = chai;

describe('get dgsw meal', function() {
  const [year, month] = [2020, 5];
  const expectedVal = {
    year: 2020,
    month: 5,
    currentDay: 5,
    meal: {},
    today: 'string',
  };

  it('should reture meal result object', async () => {
    const meal = await index.getMeal(year, month);

    if (!meal) {
      assert.fail(`fail to get meal data : ${meal}`);
    } else {
      assert.notDeepEqual(meal, expectedVal);
    }
  });
});

describe('getMeal exception handling', function() {
  it('should only pass number parameter of month', (done) => {
    index.getMeal(2020, '05')
      .then((result) => {
        done(new Error(`passed string parameter : ${result}`));
      })
      .catch(error => {
        expect(error.message).equal('TypeError: parameter is only allowed number(integer) type')
        done();
      });
  });
});
