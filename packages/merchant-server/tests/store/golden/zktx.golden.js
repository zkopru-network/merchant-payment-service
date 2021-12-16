"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zktx_1 = void 0;
const transaction_1 = require("@zkopru/transaction");
const babyjubjub_1 = require("@zkopru/babyjubjub");
exports.zktx_1 = new transaction_1.ZkTx({
    "inflow": [],
    "outflow": [],
    "fee": babyjubjub_1.Fp.from(1),
    "proof": {
        "pi_a": [babyjubjub_1.Fp.from(1), babyjubjub_1.Fp.from(1)],
        "pi_b": [[babyjubjub_1.Fp.from(1), babyjubjub_1.Fp.from(1)], [babyjubjub_1.Fp.from(1), babyjubjub_1.Fp.from(1)], [babyjubjub_1.Fp.from(1), babyjubjub_1.Fp.from(1)]],
        "pi_c": [babyjubjub_1.Fp.from(1), babyjubjub_1.Fp.from(1)]
    },
    "memo": {
        "version": 2,
        "data": Buffer.from("AAAAAPosmWZolegbf2/EEay3+kzCQQSLYxorrB+WogFOztGtjWUykj/s7EfvXqlp2kjE8ODzVPhUZMBvNt29JXgv4aKQCb+spch8FsLH3QZqAj8ca1uUGTUAW5YPeJdvGoKnLV/puVRGeR1Z0X+oFbRHykeOxE42tPf7frthewyfGomZZ2rObW+qSgthGvsQPCeApF8U3UXud0DjZDX3lAOGNLlwDg==")
    }
});
//# sourceMappingURL=zktx.golden.js.map