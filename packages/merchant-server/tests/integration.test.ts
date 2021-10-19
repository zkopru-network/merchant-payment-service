import {createApp} from "../src";

async function main() {
    const app = await createApp()
    app.listen(3000);
}
main()
