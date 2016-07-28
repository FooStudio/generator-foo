<style src="styles/components/Loader.styl" lang="stylus" scoped></style>

<script>
    import store from "app/store"

    import {loading, progress} from "app/getters/loader"
    import {loading as loadingAction} from "app/actions/loader"

    export default{
        name: "Loader",
        data(){
            return {}
        },
        props     : {},
        components: {},
        methods   : {},
        computed  : {},
        vuex      : {
            actions: {
                loadingAction
            },
            getters: {
                loading,
                progress
            }
        },
        store
    }
</script>

<template>
    <div class="Loader">
        <h5>Internal Loading</h5>
        <p>Progress: {{progress}}</p>
        <button @click="loadingAction(false)">loader</button>
    </div>
</template>
