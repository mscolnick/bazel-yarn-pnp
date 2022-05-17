module.exports = {
  name: `plugin-hello-world`,
  factory: (require) => {
    const { BaseCommand } = require(`@yarnpkg/cli`);

    class HelloWorldCommand extends BaseCommand {
      static paths = [[`hello`]];

      async execute() {
        this.context.stdout.write(`This is my very own plugin 😎\n`);
      }
    }

    return {
      commands: [HelloWorldCommand],
    };
  },
};
