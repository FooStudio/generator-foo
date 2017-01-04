<style src="styles/views/Home.styl" lang="stylus"></style>

<script type="text/babel">
    import MainTransition from "app/transitions/GSAP"

    export default{
        name: "Home",
        data(){
            return {
                users: [],
                filter: "",
                loading: true,
                error: false
            }
        },
        created(){
            this.fetchData();
        },
        props: {},
        components: {MainTransition},
        methods: {
            fetchData(){
                this.$get("https://jsonplaceholder.typicode.com/users").then((response) => {
                    this.loading = false;
                    this.users = response.body;
                }).then(undefined, (error) => {
                    this.loading = false;
                    this.error = true;
                    console.error(error);
                })
            },
            beforeEnter(el){
                TweenMax.set(el, {alpha: 0, height: 0})
            },
            enter(el, done){
                let delay = el.dataset.index * .015;
                TweenMax.to(el, 0.65,
                    {alpha: 1, height: 24, delay: delay, ease: Power4.easeOut, onComplete: done});
            },
            leave(el, done){
                let delay = el.dataset.index * .015;
                TweenMax.to(el, 0.65,
                    {alpha: 0, height: 0, ease: Power4.easeOut, delay: delay, onComplete: done});
            }
        },
        computed: {
            filteredUsers(){
                return this.users.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
                })
            }
        }
    }
</script>¡

<template>
    <main-transition>
        <div class="Home">
            <h1 ref="title">{{$t("home.title")}}</h1>
            <h3>{{$t("home.subtitle")}}</h3>

            <h4 v-if="$mq.resize && $mq.above($mv.hd)">HD</h4>
            <h4 v-if="$mq.resize && $mq.between([$mv.mobile, $mv.hd])">Desktop</h4>
            <h4 v-if="$mq.resize && $mq.below($mv.mobile)">Mobile</h4>

            <h4 v-if="loading">loading data</h4>
            <h4 v-else-if="error">Error loading</h4>
            <div v-else="!loading && !error" class="users">
                <input type="text" v-model="filter">
                <transition-group
                    name="staggered-fade"
                    tag="ul"
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
                >
                    <li v-for="(user, index) in filteredUsers" :key="user.id" :data-index="index">{{user.name}}</li>
                </transition-group>
            </div>
        </div>
    </main-transition>
</template>
