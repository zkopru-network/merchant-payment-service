import {ZkTx} from "@zkopru/transaction";
import {Fp} from "@zkopru/babyjubjub";

export const zktx_1 = new ZkTx(
    {
        "inflow": [],
        "outflow": [],
        "fee": Fp.from(1),
        "proof": {
            "pi_a": [Fp.from(1),Fp.from(1)],
            "pi_b": [[Fp.from(1),Fp.from(1)], [Fp.from(1),Fp.from(1)], [Fp.from(1),Fp.from(1)]],
            "pi_c": [Fp.from(1), Fp.from(1)]
        },
        "memo": {
            "version": 2,
            "data": Buffer.from("AAAAAPosmWZolegbf2/EEay3+kzCQQSLYxorrB+WogFOztGtjWUykj/s7EfvXqlp2kjE8ODzVPhUZMBvNt29JXgv4aKQCb+spch8FsLH3QZqAj8ca1uUGTUAW5YPeJdvGoKnLV/puVRGeR1Z0X+oFbRHykeOxE42tPf7frthewyfGomZZ2rObW+qSgthGvsQPCeApF8U3UXud0DjZDX3lAOGNLlwDg==")
        }
    });