import axios from "axios";
import { types } from "../utils/utils";

export async function getData(value) {
  const results = [];
  const resultsPerPage = 50;

  const path = `https://api.github.com/search/repositories?q=${value}&per_page=${resultsPerPage}`;
  const response = await axios.get(path).catch((error) => {
    if (error.response) {
      console.log("error", error.response);
      return false;
    }
  });

  if (!response) return false;

  const items = response.data.items;
  const data = items.map((el) => {
    return {
      name: el.name,
      url: el.html_url,
      type: types.repository,
    };
  });

  results.push(...data);

  const path2 = `https://api.github.com/search/users?q=${value}&per_page=${resultsPerPage}`;
  const response2 = await axios.get(path2).catch((error) => {
    if (error.response) {
      console.log("error", error.response);
      return false;
    }
  });

  if (!response2) return false;

  const items2 = response2.data.items;
  const data2 = items2.map((el) => {
    return {
      name: el.login,
      url: el.html_url,
      type: types.user,
    };
  });

  results.push(...data2);

  results.sort(function (a, b) {
    let aa = a.name.toLowerCase();
    let bb = b.name.toLowerCase();

    if (aa < bb) {
      return -1;
    }
    if (aa > bb) {
      return 1;
    }
    return 0;
  });

  return results.splice(0, 50);

  //   const paths = [
  //     `https://api.github.com/search/repositories?q=${value}&per_page=${resultsPerPage}`,
  //     `https://api.github.com/search/users?q=${value}&per_page=${resultsPerPage}`,
  //   ];

  //   await Promise.all(
  //     paths.map(async (path) => {
  //       const response = await axios.get(path);

  //       const items = response.data.items;
  //       results.push(...response.data.items);
  //       console.log(results);
  //       const data = results.map((el) => {
  //         return {
  //           name: el.name,
  //           url: el.html_url,
  //         };
  //       });
  //     //  console.log(data);

  //     })
  //   );
}
