<style src="styles/views/Main.styl" lang="stylus" scoped></style>

<script>
    import store from "app/store"

    import AppHeader from "app/components/AppHeader.vue"
    import Loader from "app/components/Loader.vue"

    import {loading} from "app/getters/loader"

    export default{
        components: {
            AppHeader,
            Loader
        },
        vuex      : {
            getters: {
                loading
            }
        },
        store
    }
</script>

<template>
    <div id="app">
        <loader v-show="loading" transition="LoaderTransition"></loader>
        <app-header></app-header>
        <div id="viewContainer">
            <router-view transition="MainTransition" transition-mode="simultaneous"></router-view>
        </div>
    </div>

</template>


