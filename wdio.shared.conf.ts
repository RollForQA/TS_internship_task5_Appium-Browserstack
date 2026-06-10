export const config: Omit<WebdriverIO.Config, 'capabilities'> = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.ts'],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 1,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60_000
  }
};
