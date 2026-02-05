export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    (commitMessage) => {
    // add an exception for github
      return /^Merge branch '.*' into [\w/\-]+$/.test(commitMessage);
    },
  ],
};
