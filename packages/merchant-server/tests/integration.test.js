"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function main() {
    const app = await (0, src_1.createApp)();
    app.listen(3000);
}
main();
//# sourceMappingURL=integration.test.js.map