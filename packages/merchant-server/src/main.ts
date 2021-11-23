import {createApp} from "./index";

async function bootstrap() {
    const app = await createApp();
    app.listen(3000)
}
bootstrap()