import {Command, flags} from '@oclif/command'
import {createApp} from "@merchant-payment-service/server";

export default class Start extends Command {
    static description = 'start merchant service api'

    static examples = [
        `$ merchant-service start`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        port: flags.string({char: 'p', description: 'set port(default: 3000)'}),
        dbUrl: flags.string({char: 'u', description: 'set db url'}),
        dbType: flags.string({char: 't', description: 'set db type(sqlite|mysql|postgres)'}),
        coordinatorUrl: flags.string({char: 'c', description: 'set coordinator url'}),
    }

    static args = []

    // @ts-ignore
    async run() {
        const {args, flags} = this.parse(Start)
        this.log(`args: ${JSON.stringify(args)}, flags: ${JSON.stringify(flags)}`)

        process.env.DB_TYPE = flags.dbType ? flags.dbType : "sqlite";
        process.env.DB_URL = flags.dbUrl ? flags.dbUrl : "/tmp/dev.sqlite";
        process.env.COORDINATOR_URL = flags.coordinatorUrl ? flags.coordinatorUrl : "http://localhost:8888";

        const app = await createApp();
        app.listen(flags.port ? flags.port : 3000)
    }

}