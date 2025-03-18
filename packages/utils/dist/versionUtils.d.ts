declare const npmRegistry = "https://registry.npmmirror.com";
declare function getNpmInfo(packageName: string): Promise<any>;
declare function getLatestVersion(packageName: string): Promise<any>;
declare function getVersions(packageName: string): Promise<string[]>;
export { npmRegistry, getNpmInfo, getLatestVersion, getVersions };
