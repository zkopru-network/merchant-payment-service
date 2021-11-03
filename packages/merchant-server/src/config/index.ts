export default () => ({
    database: {
        url: process.env.DB_URL || "/tmp/dev.sqlite",
        type: process.env.DB_TYPE || "sqlite"
    },
    coordinatorUrl: process.env.COORDINATOR_URL || "http://localhost:8888"
})