/**
 * Do we still need this? I suspect not
 *  */
const os = require('os');

//function to run processes on node terminal
export function exec(
  cmd,
  handler = function(error, stdout, stderr) {
    console.log(stdout);
    if (error !== null) {
      console.log(stderr);
    }
  }
) {
  const childfork = require('child_process');
  return childfork.exec(cmd, handler);
}

export let obj;

// We are directly importing this into a component - huge security risk - needs to be refactored!!
export const { homedir, username } = os.userInfo(); //getting users local dir & username
const path = `${homedir}/Library/`;
const path2 = 'Application\\' + ' Support/QLstico/storage';
const dir = path + path2;

exec(`cd ${dir} && ls `);
