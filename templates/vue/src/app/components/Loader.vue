<style src="styles/components/Loader.styl" lang="stylus" scoped></style>

<script type="text/babel">

    import LoaderTransition from "app/transitions/LoaderTransition"
    import {mapActions, mapGetters} from "vuex"
    import {LOADING} from "app/store/modules/loader"

    export default{
        name: "Loader",
        data(){
            return {}
        },
        props: {},
        components: {LoaderTransition},
        methods: {
            ...mapActions({
                loadingAction: LOADING
            })
        },
        computed: {
            ...mapGetters(["loading", "progress"])
        }
    }
</script>

<template>
    <loader-transition>
        <div v-show="loading" class="Loader">
            <h5>Internal Loading</h5>
            <p>Progress: {{progress}}</p>
            <button @click="loadingAction(false)">close</button>
        </div>
    </loader-transition>
</template>
