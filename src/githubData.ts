import githubApi from "./githubApi";

interface UserProps {
  login: string;
}

async function getAllFollowers(username: string) {
  let followersData: string[] = [];
  let page = 1;
  let url = `/${username}/followers?per_page=100&page=${page}`;

  while (true) {
    const { data }: { data: UserProps[] } = await githubApi(url);

    if (data.length === 0) {
      break;
    }

    const users = data.map((user) => user.login);

    followersData = [...followersData, ...users];
    page++;
    url = `/${username}/followers?per_page=100&page=${page}`;
  }

  return followersData;
}

async function getAllFollowing(username: string) {
  let followingData: string[] = [];
  let page = 1;
  let url = `/${username}/following?per_page=100&page=${page}`;

  while (true) {
    const { data }: { data: UserProps[] } = await githubApi(url);

    if (data.length === 0) {
      break;
    }

    const users = data.map((user) => user.login);

    followingData = [...followingData, ...users];
    page++;
    url = `/${username}/following?per_page=100&page=${page}`;
  }

  return followingData;
}

export { getAllFollowers, getAllFollowing };
