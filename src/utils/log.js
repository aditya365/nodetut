import chalk from "chalk";
const log = console.log;

//helper methods to print readable messages
export function success(message) {
  log(chalk.green(message));
}

export function info(info) {
  log(chalk.yellow(info));
}

export function error(error) {
  log(chalk.red(error));
  process.exit();
}
