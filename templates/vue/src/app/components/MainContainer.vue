<style src="styles/components/MainContainer.styl" lang="stylus" scoped></style>

<script type="text/babel">

    import Vue from "vue"

    export default{
        name: "MainContainer",
        data(){
            return {}
        },
        created(){
        },
        props: {},
        components: {},
        methods: {},
        computed: {}
    }
</script>

<template>
    <div class="MainContainer">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
