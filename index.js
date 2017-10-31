const path = require('path');
const chalk = require('chalk');
const natural = require('natural');
const config = require('./config');
const Bot = require('./app/app');

console.info(`process ${chalk.blue(process.pid)} ${chalk.green('start')}.`);

process.on('SIGINT', () => {
  console.info(`SIGINT received`);
  process.exit(1);
});

process.on('exit', () => {
  console.info(`process ${chalk.blue(process.pid)} ${chalk.red('exit')}.`);
});

process.on('uncaughtException', err => {
  console.error('Error caught in uncaughtException event:');
  console.error(err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

const botService = new Bot();

botService
  .defineQuestion(`体现额`, `提现额是提现额度，可以直接提现，但需要收取手续费.`, [
    '体现',
    '提现',
    '额度',
    '体现是什么',
    '提现是什么',
    '体现的意义',
    '如何体现'
  ])
  .defineQuestion(`消费额`, `消费额是信用卡可以刷卡的额度.`, ['消费额度', '消费额是什么', '消费', '额度', '在哪里消费'])
  .train();

console.log(botService.ask('提现'));
