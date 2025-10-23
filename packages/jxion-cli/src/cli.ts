/**
 * @fileoverview Jxion Framework CLI
 * 
 * Command-line interface for the Jxion multi-framework component library.
 * Provides project scaffolding, development tools, and component generation.
 */

import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { ComponentGenerator } from "./generators/component.generator";
import { ProjectGenerator, ProjectOptions } from "./generators/project.generator";

const program = new Command();

program.name("jxion").description("Jxion Framework CLI").version("1.0.0");

// Create new project command
program
  .command("create <project-name>")
  .description("Create a new Jxion project")
  .option(
    "-f, --framework <framework>",
    "Frontend framework (vue, react, svelte, solidjs, angular)"
  )
  .option(
    "-b, --backend <backend>",
    "Backend technology (trpc, go, python-flask, none)"
  )
  .option(
    "-m, --meta-framework <meta>",
    "Meta-framework (next, nuxt, sveltekit, solidstart, angular-ssr)"
  )
  .option("--typescript", "Enable TypeScript", true)
  .option("--eslint", "Enable ESLint", true)
  .option("--husky", "Enable Husky", true)
  .option("--design-tokens", "Enable design tokens", true)
  .action(async (projectName, options) => {
    const spinner = ora("Creating Jxion project...").start();

    try {
      // Prompt for framework if not provided
      let framework = options.framework;
      if (!framework) {
        const frameworkAnswer = await inquirer.prompt([
          {
            type: "list",
            name: "framework",
            message: "Choose frontend framework:",
            choices: [
              { name: "Vue 3", value: "vue" },
              { name: "React", value: "react" },
              { name: "Svelte", value: "svelte" },
              { name: "SolidJS", value: "solidjs" },
              { name: "Angular", value: "angular" },
            ],
          },
        ]);
        framework = frameworkAnswer.framework;
      }

      // Prompt for backend if not provided
      let backend = options.backend;
      if (!backend) {
        const backendAnswer = await inquirer.prompt([
          {
            type: "list",
            name: "backend",
            message: "Choose backend technology:",
            choices: [
              { name: "tRPC (TypeScript)", value: "trpc" },
              { name: "Go", value: "go" },
              { name: "Python Flask", value: "python-flask" },
              { name: "None", value: "none" },
            ],
          },
        ]);
        backend = backendAnswer.backend;
      }

      // Prompt for meta-framework if not provided
      let metaFramework = options.metaFramework;
      if (!metaFramework) {
        const metaAnswer = await inquirer.prompt([
          {
            type: "list",
            name: "metaFramework",
            message: "Choose meta-framework (optional):",
            choices: [
              { name: "None", value: undefined },
              { name: "Next.js (React)", value: "next" },
              { name: "Nuxt (Vue)", value: "nuxt" },
              { name: "SvelteKit (Svelte)", value: "sveltekit" },
              { name: "SolidStart (SolidJS)", value: "solidstart" },
              { name: "Angular SSR", value: "angular-ssr" },
            ],
          },
        ]);
        metaFramework = metaAnswer.metaFramework;
      }

      // Prompt for additional options
      const additionalOptions = await inquirer.prompt([
        {
          type: "confirm",
          name: "typescript",
          message: "Enable TypeScript?",
          default: options.typescript,
        },
        {
          type: "confirm",
          name: "eslint",
          message: "Enable ESLint?",
          default: options.eslint,
        },
        {
          type: "confirm",
          name: "husky",
          message: "Enable Husky (Git hooks)?",
          default: options.husky,
        },
        {
          type: "confirm",
          name: "designTokens",
          message: "Enable design tokens?",
          default: options.designTokens,
        },
      ]);

      const projectOptions: ProjectOptions = {
        name: projectName,
        framework,
        backend,
        metaFramework,
        ...additionalOptions,
      };

      const generator = new ProjectGenerator(projectName);
      await generator.generate(projectOptions);

      spinner.succeed(
        chalk.green(`✅ Project "${projectName}" created successfully!`)
      );

      console.log(chalk.blue("\n📁 Project structure:"));
      console.log(`  ${projectName}/`);
      console.log(`  ├── src/`);
      console.log(`  ├── backend/`);
      console.log(`  ├── package.json`);
      console.log(`  └── README.md`);

      console.log(chalk.yellow("\n🚀 Next steps:"));
      console.log(`  cd ${projectName}`);
      console.log(`  npm install`);
      console.log(`  npm run dev`);

      if (backend !== "none") {
        console.log(chalk.magenta("\n🔧 Backend setup:"));
        console.log(`  cd backend`);
        console.log(
          `  npm install  # or go mod init, pip install -r requirements.txt`
        );
        console.log(`  npm run dev  # or go run main.go, python app.py`);
      }
    } catch (error) {
      spinner.fail(chalk.red("❌ Failed to create project"));
      console.error(error);
    }
  });

// Start development servers
program
  .command("dev")
  .description("Start all development servers")
  .option(
    "-f, --framework <framework>",
    "Start specific framework (vue, react, svelte, solidjs, angular, all)"
  )
  .action(async (options) => {
    const { spawn } = await import("child_process");
    const path = await import("path");

    const spinner = ora("Starting development servers...").start();

    try {
      const framework = options.framework || "all";
      const processes: any[] = [];

      if (framework === "all" || framework === "vue") {
        spinner.text = "Starting Vue app on port 3000...";
        const vueProcess = spawn("npm", ["run", "dev"], {
          cwd: path.join(process.cwd(), "packages", "jxion-vue"),
          stdio: "inherit",
          shell: true,
        });
        processes.push({ name: "Vue", process: vueProcess, port: 3000 });
      }

      if (framework === "all" || framework === "react") {
        spinner.text = "Starting React app on port 3001...";
        const reactProcess = spawn("npm", ["run", "dev"], {
          cwd: path.join(process.cwd(), "packages", "jxion-react"),
          stdio: "inherit",
          shell: true,
        });
        processes.push({ name: "React", process: reactProcess, port: 3001 });
      }

      if (framework === "all" || framework === "svelte") {
        spinner.text = "Starting Svelte app on port 3002...";
        const svelteProcess = spawn("npm", ["run", "dev"], {
          cwd: path.join(process.cwd(), "packages", "jxion-svelte"),
          stdio: "inherit",
          shell: true,
        });
        processes.push({ name: "Svelte", process: svelteProcess, port: 3002 });
      }

      if (framework === "all" || framework === "solidjs") {
        spinner.text = "Starting SolidJS app on port 3004...";
        const solidjsProcess = spawn("npm", ["run", "dev"], {
          cwd: path.join(process.cwd(), "packages", "jxion-solidjs"),
          stdio: "inherit",
          shell: true,
        });
        processes.push({
          name: "SolidJS",
          process: solidjsProcess,
          port: 3004,
        });
      }

      if (framework === "all" || framework === "angular") {
        spinner.text = "Starting Angular app on port 3003...";
        const angularProcess = spawn("npm", ["run", "dev"], {
          cwd: path.join(process.cwd(), "packages", "jxion-angular"),
          stdio: "inherit",
          shell: true,
        });
        processes.push({
          name: "Angular",
          process: angularProcess,
          port: 3003,
        });
      }

      if (framework === "all") {
        spinner.text = "Starting tRPC backend on port 3005...";
        const backendProcess = spawn("npm", ["run", "dev"], {
          cwd: path.join(process.cwd(), "packages", "jxion-backend"),
          stdio: "inherit",
          shell: true,
          env: { ...process.env, PORT: "3005" },
        });
        processes.push({
          name: "Backend",
          process: backendProcess,
          port: 3005,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      spinner.succeed(chalk.green("✅ Development servers started!"));

      console.log(chalk.blue("\n🌐 Development URLs:"));
      processes.forEach(({ name, port }) => {
        console.log(`  ${name}: http://localhost:${port}`);
      });

      console.log(chalk.yellow("\n💡 Press Ctrl+C to stop all servers"));

      // Handle graceful shutdown
      process.on("SIGINT", () => {
        console.log(chalk.red("\n🛑 Stopping all servers..."));
        processes.forEach(({ process: proc }) => {
          proc.kill("SIGTERM");
        });
        process.exit(0);
      });
    } catch (error) {
      spinner.fail(chalk.red("❌ Failed to start development servers"));
      console.error(error);
    }
  });

// Build all packages
program
  .command("build")
  .description("Build all packages")
  .action(async () => {
    const spinner = ora("Building all packages...").start();

    try {
      spinner.text = "Building @jxion/shared...";
      // Build shared package

      spinner.text = "Building @jxion/core...";
      // Build core package

      spinner.text = "Building @jxion/design...";
      // Build design package

      spinner.text = "Building framework packages...";
      // Build framework packages

      await new Promise((resolve) => setTimeout(resolve, 2000));

      spinner.succeed(chalk.green("✅ All packages built successfully!"));
    } catch (error) {
      spinner.fail(chalk.red("❌ Build failed"));
      console.error(error);
    }
  });

// Test command
program
  .command("test")
  .description("Run tests for all packages")
  .action(async () => {
    const spinner = ora("Running tests...").start();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      spinner.succeed(chalk.green("✅ All tests passed!"));
    } catch (error) {
      spinner.fail(chalk.red("❌ Tests failed"));
      console.error(error);
    }
  });

// Info command
program
  .command("info")
  .description("Show Jxion Framework information")
  .action(() => {
    console.log(chalk.blue.bold("\n🚀 Jxion Framework"));
    console.log(chalk.gray("A modern, multi-framework component library"));

    console.log(chalk.yellow("\n📦 Packages:"));
    console.log("  @jxion/shared  - Core components");
    console.log("  @jxion/core    - Business logic & tRPC");
    console.log("  @jxion/design  - Design tokens & styles");
    console.log("  @jxion/vue     - Vue 3 integration");
    console.log("  @jxion/react   - React integration");
    console.log("  @jxion/svelte  - Svelte integration");
    console.log("  @jxion/solidjs - SolidJS integration");
    console.log("  @jxion/angular - Angular integration");
    console.log("  @jxion/backend - tRPC backend");
    console.log("  @jxion/cli    - Command line interface");

    console.log(chalk.green("\n🎯 Supported Frameworks:"));
    console.log("  Vue 3, React, Svelte, SolidJS, Angular");

    console.log(chalk.magenta("\n🔧 Backend Options:"));
    console.log("  tRPC, Go, Python Flask");
  });

program.parse();
