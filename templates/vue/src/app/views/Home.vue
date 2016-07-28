<style src="styles/views/Home.styl" lang="stylus"></style>

<script>
    import store from "app/store"
    import {incrementCounter, decrementCounter} from "app/actions/counter"
    import {getCount} from "app/getters/counter"

    export default{
        data(){
            return {}
        },
        name      : "Home",
        methods   : {},
        components: {},
        vuex      : {
            actions: {
                increment: incrementCounter,
                decrement: decrementCounter,
            },
            getters: {
                getCount
            }
        },
        store
    }
</script>

<template>
    <div class="Home">
        <h1>{{$t("home.title")}}</h1>
        <h3>{{$t("home.subtitle")}}</h3>
        <button @click="increment">Increment +1</button>
        <button @click="decrement">Decrement -1</button>
        <div>Some state changes: {{getCount}}</div>
    </div>
</template>
