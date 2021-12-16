import {createApp} from "./index";
import {HttpExceptionFilter} from "./middleware/http-exception.filter";
import {GlobalExceptionFilter} from "./middleware/global-exception.filter";

async function bootstrap() {
    const app = await createApp();
    app.useGlobalFilters( new GlobalExceptionFilter(), new HttpExceptionFilter())
    app.listen(3000)
}
bootstrap()