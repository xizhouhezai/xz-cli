var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { select, input, confirm } from "@inquirer/prompts";
import os from "node:os";
import { NpmPackage } from "@xz-cli/utils";
import path from "node:path";
import ora from "ora";
import fse from "fs-extra";
import ejs from "ejs";
import { glob } from "glob";
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectTemplate = yield select({
            message: "请选择项目模版",
            choices: [
                {
                    name: "react 项目",
                    value: "@xz-cli/template-react"
                },
                {
                    name: "vue 项目",
                    value: "@xz-cli/template-vue"
                }
            ]
        });
        let projectName = "";
        while (!projectName) {
            projectName = yield input({ message: "请输入项目名" });
        }
        const targetPath = path.join(process.cwd(), projectName);
        if (fse.existsSync(targetPath)) {
            const empty = yield confirm({ message: "该目录不为空，是否清空" });
            if (empty) {
                fse.emptyDirSync(targetPath);
            }
            else {
                process.exit(0);
            }
        }
        console.log(projectTemplate, projectName);
        const pkg = new NpmPackage({
            name: projectTemplate,
            targetPath: path.join(os.homedir(), ".xz-cli-template")
        });
        if (!(yield pkg.exists())) {
            const spinner = ora("下载模版中...").start();
            yield pkg.install();
            yield sleep(1000);
            spinner.stop();
        }
        else {
            const spinner = ora("更新模版中...").start();
            yield pkg.update();
            yield sleep(1000);
            spinner.stop();
        }
        // console.log(pkg.npmFilePath, "============");
        const spinner = ora("创建项目中...").start();
        yield sleep(1000);
        const templatePath = path.join(pkg.npmFilePath, "template");
        // const targetPath = path.join(process.cwd(), projectName);
        fse.copySync(templatePath, targetPath);
        spinner.stop();
        const renderData = { projectName };
        const deleteFiles = [];
        const questionConfigPath = path.join(pkg.npmFilePath, "questions.json");
        if (fse.existsSync(questionConfigPath)) {
            const config = fse.readJSONSync(questionConfigPath);
            for (let key in config) {
                const res = yield confirm({ message: "是否启用 " + key });
                renderData[key] = res;
                if (!res) {
                    deleteFiles.push(...config[key].files);
                }
            }
        }
        const files = yield glob("**", {
            cwd: targetPath,
            nodir: true,
            ignore: "node_modules/**"
        });
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(targetPath, files[i]);
            const renderResult = yield ejs.renderFile(filePath, renderData);
            fse.writeFileSync(filePath, renderResult);
        }
        deleteFiles.forEach((item) => {
            fse.removeSync(path.join(targetPath, item));
        });
    });
}
function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
// create();
export default create;
//# sourceMappingURL=index.js.map