import chalk from "chalk"

export const log = {
  info:    (msg: string) => console.log(chalk.blue("ℹ"), msg),
  success: (msg: string) => console.log(chalk.green("✓"), msg),
  warn:    (msg: string) => console.log(chalk.yellow("⚠"), msg),
  error:   (msg: string) => console.log(chalk.red("✗"), msg),
  dim:     (msg: string) => console.log(chalk.dim(msg)),
  bold:    (msg: string) => console.log(chalk.bold(msg)),
  step:    (n: number, total: number, msg: string) => console.log(chalk.dim(`[${n}/${total}]`), msg),
}
