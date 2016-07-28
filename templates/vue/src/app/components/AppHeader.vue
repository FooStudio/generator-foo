<style src="styles/components/AppHeader.styl" lang="stylus" scoped></style>

<script>
    import store from "app/store"
    import {incrementCounter, decrementCounter} from "app/actions/counter"
    import {loading} from "app/actions/loader"

    export default{
        data(){
            return {}
        },
        props     : {},
        components: {},
        methods   : {},
        computed  : {},
        vuex      : {
            actions: {
                increment: incrementCounter,
                decrement: decrementCounter,
                summonLoader: loading
            },
            getters: {}
        },
        store
    }
</script>

<template>
    <div class="AppHeader">

        <h1>Header</h1>
        <img src="~assets/img/logo.gif" alt="logo"/>
        <nav>
            <a v-link="{path: '/', exact: true}">Home</a>
            <a v-link="{path: '/test'}">Test</a>
            <a v-link="{path: '/404'}">404</a>
        </nav>

        <ul>
            <li>
                <button @click="$setLocale('es-mx')">es</button>
            </li>
            <li>
                <button @click="$setLocale('en-us')">en</button>
            </li>
            <li>
                <button @click="summonLoader(true)">loader</button>
            </li>
        </ul>
    </div>
</template>
