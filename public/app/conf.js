exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/**.js'],
  baseUrl: 'http://localhost:3000/public',
  jasmineNodeOpts: {
  	showColors: true
  },
  onPrepare: function(){
  	require('protractor-uisref-locator')(protractor);
  }
};