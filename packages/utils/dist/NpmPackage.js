var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "node:fs";
import fse from "fs-extra";
// @ts-ignore
import npminstall from "npminstall";
import { getLatestVersion, npmRegistry } from "./versionUtils.js";
import path from "node:path";
class NpmPackage {
    constructor(options) {
        this.version = "";
        this.targetPath = options.targetPath;
        this.name = options.name;
        this.storePath = path.resolve(options.targetPath, "node_modules");
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(this.targetPath)) {
                fse.mkdirpSync(this.targetPath);
            }
            const version = yield getLatestVersion(this.name);
            this.version = version;
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepare();
            return npminstall({
                pkgs: [
                    {
                        name: this.name,
                        version: this.version
                    }
                ],
                registry: npmRegistry,
                root: this.targetPath
            });
        });
    }
    get npmFilePath() {
        return path.resolve(this.storePath, `.store/${this.name.replace("/", "+")}@${this.version}/node_modules/${this.name}`);
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepare();
            return fs.existsSync(this.npmFilePath);
        });
    }
    getPackageJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.exists()) {
                return fse.readJsonSync(path.resolve(this.npmFilePath, "package.json"));
            }
            return null;
        });
    }
    getLatestVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return getLatestVersion(this.name);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const latestVersion = yield this.getLatestVersion();
            return npminstall({
                root: this.targetPath,
                registry: npmRegistry,
                pkgs: [
                    {
                        name: this.name,
                        version: latestVersion
                    }
                ]
            });
        });
    }
}
export default NpmPackage;
//# sourceMappingURL=NpmPackage.js.map