'use strict'
const { expect, assert } = require('chai');
const index = require('../dist');

describe('get dgsw meal', function() {
  const [year, month] = [2020, 5];
  const expectedVal = {
    year: 2020,
    month: 5,
    currentDay: 5,
    meal: {},
    today: 'string',
  };

  it('gea meal of a month', async () => {
    index.getMeal(year, month)
      .then(meal => {
        if (!meal) {
          assert.fail(`fail to get meal data : ${meal}`);
        } else {
          assert.notDeepEqual(meal, expectedVal);
        }
      })
      .catch(err => {
        assert.fail(`fail to get meal data: ${err}`);
      });
  });
});

describe('getMeal exception handling', function() {
  it('string parameter', () => {
    index.getMeal(2020, "05")
      .then(meal => {
        assert.fail(`not expected result : ${meal}`);
      })
      .catch(err => {
        assert.strictEqual(err.message, 'TypeError: parameter is only allowed number type');
      });
  })
});
