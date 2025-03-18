import axios from "axios";
import urlJoin from "url-join";

const npmRegistry = "https://registry.npmmirror.com";

async function getNpmInfo(packageName: string) {
  const url = urlJoin(npmRegistry, packageName);
  try {
    const response = await axios.get(url);

    // console.log(response);

    if (response.status === 200) {
      return response.data;
    }
  } catch(e) {
    return Promise.reject(e);
  }
}

async function getLatestVersion(packageName: string) {
  const data = await getNpmInfo(packageName);
  return data['dist-tags'].latest;
}

async function getVersions(packageName: string) {
  const data = await getNpmInfo(packageName);
  return  Object.keys(data.versions);
}

export {
  npmRegistry,
  getNpmInfo,
  getLatestVersion,
  getVersions
}
