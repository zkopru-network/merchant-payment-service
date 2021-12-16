export default () => ({
    database: {
        url: process.env.DB_URL || "/tmp/dev.sqlite",
        type: process.env.DB_TYPE || "sqlite"
    },
    coordinatorUrl: process.env.COORDINATOR_URL || "http://localhost:8888",
    blockchainUrl: "http://localhost:8545",
    l1: {
        privateKey:"a633a480fa029f066d97074101c62ffe4a9a2e5688335b696cd3563d10d2c2c6"
    },
    snarkKeyPath: "",
    snarkKeyCid: ""
})