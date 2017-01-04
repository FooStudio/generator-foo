<style src="styles/views/Root.styl" lang="stylus" scoped></style>

<script type="text/babel">
    import Loader from "app/components/Loader.vue"
    import AppHeader from "app/components/AppHeader.vue"
    import MainContainer from "app/components/MainContainer.vue"

    export default{
        data(){
            return {}
        },
        components: {
            Loader,
            AppHeader,
            MainContainer
        },
        computed: {}
    }
</script>

<template>
    <div id="app">
        <loader></loader>
        <app-header></app-header>
        <main-container></main-container>
    </div>
</template>
