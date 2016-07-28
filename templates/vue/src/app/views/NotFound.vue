<style src="styles/views/NotFound.styl" lang="stylus"></style>

<script>
    import store from "app/store"

    export default{
        name      : "NotFound",
        data(){
            return {}
        },
        props     : {},
        components: {},
        methods   : {},
        computed  : {},
        vuex      : {
            actions: {},
            getters: {}
        },
        store
    }
</script>

<template>
    <div class="NotFound">
        <div className="NotFound">
            <h2>{{$t( "notFound.title" )}} Foo</h2>
            <h3>{{$t( "notFound.subtitle" )}}</h3>
        </div>
    </div>
</template>
