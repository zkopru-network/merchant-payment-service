import {Command, flags} from '@oclif/command'

export default class Start extends Command {
    static description = 'start merchant service api'

    static examples = [
        `$ merchant-service start`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        port: flags.string({char: 'p', description: 'set port(default: 5000)'}),
    }

    static args = []

    // @ts-ignore
    async run() {
        const {args, flags} = this.parse(Start)
        this.log(`args: ${JSON.stringify(args)}, flags: ${JSON.stringify(flags)}`)

    }

}