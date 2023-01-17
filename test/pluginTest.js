module.exports = {
  test: () => {
    browser.assert.recordCountIs(
      1,
      'people',
      "first_name = 'Jane' AND last_name = 'Doe'"
    );
  },
};
