import {Command, flags} from '@oclif/command'

export default class Info extends Command {
    static description = 'info'

    static examples = [
        `$ merchant-service info`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
    }

    static args = []

    // @ts-ignore
    async run() {
        const {args, flags} = this.parse(Info)
        this.log(`args: ${args}, flags: ${flags}`)
        //todo: display wallet information.
    }

}