const { prompt } = require('inquirer');
const Apigw = require('./apigw');
const Scf = require('./scf');
const logger = require('../../logger');
const {
  region,
  credentials,
  apigwOptions = {},
  scfOptions = {},
} = require('../../../config').tencent;

async function clean() {
  const { apigwConfirm } = await prompt([
    {
      type: 'confirm',
      name: 'apigwConfirm',
      message: 'Are you sure to delete all exist APIGW?',
    },
  ]);
  if (apigwConfirm === true) {
    const api = new Apigw({ credentials, region, logger });
    await api.removeAll(apigwOptions);
  }

  const { scfConfirm } = await prompt([
    {
      type: 'confirm',
      name: 'scfConfirm',
      message: 'Are you sure to delete all exist SCF?',
    },
  ]);
  if (scfConfirm === true) {
    const scf = new Scf({ credentials, region, logger });
    await scf.removeAll(scfOptions);
  }
}

module.exports = clean;
