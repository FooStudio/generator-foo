/**
 * Created by mendieta on 7/14/16.
 */

import Home from "app/views/Home.vue"
import Test from "app/views/Test.vue"
import NotFound from "app/views/NotFound.vue"

const routes = {
    "/"    : {
        component: Home
    },
    "/test": {
        component: Test
    },
    "*"    : {
        component: NotFound
    }
}

export default routes;
