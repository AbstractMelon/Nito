const { exec } = require("child_process");
const path = require("path");

// Function to run a command in the shell and return a promise
function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    const process = exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });

    // Log the output of the command
    process.stdout.on("data", (data) => {
      console.log(data);
    });
    process.stderr.on("data", (data) => {
      console.error(data);
    });
  });
}

// Run concurrently both frontend and backend commands
async function runConcurrently() {
  try {
    console.log("Running frontend and backend concurrently...");

    // Run the "dev" script for both frontend and backend concurrently
    const frontendCommand = "npm run dev";
    const backendCommand = "npm run dev";

    const frontendDir = path.resolve(__dirname, "frontend");
    const backendDir = path.resolve(__dirname, "backend");

    // Run frontend and backend commands in parallel
    const [frontendResult, backendResult] = await Promise.all([
      runCommand(frontendCommand, frontendDir),
      runCommand(backendCommand, backendDir),
    ]);

    console.log("Frontend and Backend started successfully:");
    console.log(frontendResult);
    console.log(backendResult);
  } catch (error) {
    console.error("Error running concurrently:", error);
    process.exit(1);
  }
}

// Start the concurrently execution
runConcurrently();
