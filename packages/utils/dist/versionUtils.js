var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import urlJoin from "url-join";
const npmRegistry = "https://registry.npmmirror.com";
function getNpmInfo(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = urlJoin(npmRegistry, packageName);
        try {
            const response = yield axios.get(url);
            // console.log(response);
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    });
}
function getLatestVersion(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getNpmInfo(packageName);
        return data['dist-tags'].latest;
    });
}
function getVersions(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getNpmInfo(packageName);
        return Object.keys(data.versions);
    });
}
export { npmRegistry, getNpmInfo, getLatestVersion, getVersions };
//# sourceMappingURL=versionUtils.js.map