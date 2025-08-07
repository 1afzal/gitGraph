const makeCommits = (n, commitsPerDay = 3) => {
  if (n === 0) return simpleGit().push();

  const x = random.int(0, 40); // random week
  const y = random.int(0, 6);  // random day of the week
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };

  const git = simpleGit();

  // Recursive function to make multiple commits on the same day
  const makeMultipleCommits = (count) => {
    if (count === 0) {
      return makeCommits(--n, commitsPerDay); // Move to the next day
    }

    jsonfile.writeFile(path, data, () => {
      git.add([path]).commit(date, { "--date": date }, () => {
        makeMultipleCommits(count - 1); // Commit again on same date
      });
    });
  };

  console.log(`Making ${commitsPerDay} commits on ${date}`);
  makeMultipleCommits(commitsPerDay); // Start multiple commits on same day
};

// Call with desired total days and commits per day
makeCommits(50, 5); // 100 days, 5 commits per day
