<style src="styles/components/Foo.styl" lang="stylus" scoped></style>

<script>
    import store from "app/store"

    export default{
        name      : "Foo",
        data(){
            return {}
        },
        route     : {
            canReuse: false
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
    <div class="Foo">
        <h4>Inner View {{$route.params.id}}</h4>
    </div>
</template>
