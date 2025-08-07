import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// Path to a dummy file where commit changes will be written
const path = "./data.json";

/**
 * Makes multiple fake commits on a random day within the past year.
 * @param {number} n - Number of days to create commits for.
 * @param {number} commitsPerDay - Number of commits to make per day.
 */
const makeCommits = (n, commitsPerDay = 3) => {
  if (n === 0) return simpleGit().push();

  // Generate random week (0-40) and day (0-6) to simulate a day in the past year
  const x = Math.floor(Math.random() * 41); // 0 to 40 weeks
  const y = Math.floor(Math.random() * 7);  // 0 to 6 days

  // Calculate a date that Git will recognize for contribution graph
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };

  const git = simpleGit();

  // Recursive function to create multiple commits on the same day
  const makeMultipleCommits = (count) => {
    if (count === 0) {
      // After finishing commits for one day, move to next day
      return makeCommits(--n, commitsPerDay);
    }

    jsonfile.writeFile(path, data, () => {
      git.add([path]).commit(date, { "--date": date }, () => {
        makeMultipleCommits(count - 1); // Do next commit for the same day
      });
    });
  };

  console.log(`Creating ${commitsPerDay} commits on ${date}`);
  makeMultipleCommits(commitsPerDay);
};

// Call the function to begin creating commits
makeCommits(50, 5); // 50 days, 5 commits per day
