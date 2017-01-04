/**
 * Created by mendieta on 11/7/16.
 */

import Home from "app/views/Home.vue"
import Test from "app/views/Test.vue"
import NotFound  from "app/views/NotFound.vue"

const routes = {
    mode: "hash",
    base: "/",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/test",
            name: "test",
            component: Test
        },
        {
            path: "*",
            name: "404",
            component: NotFound
        }
    ]
};

export default routes;
