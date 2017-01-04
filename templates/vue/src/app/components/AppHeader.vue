<style src="styles/components/AppHeader.styl" lang="stylus" scoped></style>

<script type="text/babel">

    import {mapActions} from "vuex"
    import {LOADING} from "app/store/modules/loader"

    export default{
        name: "AppHeader",
        data(){
            return {}
        },
        props: {},
        components: {},
        methods: {
            ...mapActions({
                summonLoader: LOADING
            })
        },
        computed: {}
    }


</script>

<template>
    <div class="AppHeader">
        <img src="~assets/img/logo.gif" alt="logo"/>
        <transition name="fade" mode="out-in">
            <span :key="$route.path">{{$route.path}}</span>
        </transition>
        <nav>
            <router-link to="/">{{$t("home.title")}}</router-link>
            <router-link to="/test">{{$t("test.title")}}</router-link>
            <router-link to="/404">404</router-link>
        </nav>

        <ul>
            <li>
                <button @click="$setLocale('es-MX')">es</button>
            </li>
            <li>
                <button @click="$setLocale('en-US')">en</button>
            </li>
            <li>
                <button @click="summonLoader(true)">loader</button>
            </li>
        </ul>
    </div>
</template>
