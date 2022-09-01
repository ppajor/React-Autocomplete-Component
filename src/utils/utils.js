//objects
export const types = {
  user: "user",
  repository: "repo",
};

//functions

export function sortAlphabetically(arr) {
  return arr.sort(function (a, b) {
    let el1 = a.name.toLowerCase();
    let el2 = b.name.toLowerCase();

    if (el1 < el2) {
      return -1;
    }
    if (el1 > el2) {
      return 1;
    }
    return 0;
  });
}
