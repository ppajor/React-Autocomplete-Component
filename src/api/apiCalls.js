import axios from "axios";
import { types, sortAlphabetically } from "../utils/utils";

export async function getData(value) {
  const results = [];
  const resultsPerPage = 50;

  const paths = [
    `https://api.github.com/search/repositories?q=${value}&per_page=${resultsPerPage}`,
    `https://api.github.com/search/users?q=${value}&per_page=${resultsPerPage}`,
  ];

  var error = false;

  let promises = await Promise.allSettled(
    paths.map(async (path, index) => {
      const response = await axios.get(path);

      const items = response.data.items;
      let data;
      if (index === 0) {
        data = items.map((el) => {
          return {
            name: el.name,
            url: el.html_url,
            type: types.repository,
          };
        });
      } else if (index === 1) {
        data = items.map((el) => {
          return {
            name: el.login,
            url: el.html_url,
            type: types.user,
          };
        });
      }
      results.push(...data);
    })
  );

  promises.map((promise) => {
    if (promise.status === "rejected") error = true;
  });

  const sortedData = sortAlphabetically(results).splice(0, 50);
  if (!error) return sortedData;
  else return false;
}
