<style src="styles/views/Test.styl" lang="stylus"></style>

<script>
    import store from "app/store"

    export default{
        name      : "Test",
        data(){
            return {}
        },
        components: {},
        methods   : {},
        vuex      : {
            actions: {},
            getters: {}
        },
        store
    }
</script>

<template>
    <div class="Test">
        <h1>{{$t("test.title")}}</h1>
        <h3>{{$t("test.subtitle")}}</h3>
    </div>
</template>
