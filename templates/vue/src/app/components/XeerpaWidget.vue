<style src="styles/components/XeerpaWidget.styl" lang="stylus" scoped></style>

<script type="text/babel">

    import Facebook from "foo/net/api/Facebook"
    import filter from  "lodash/filter"
    import find from "lodash/find"
    import reject from "lodash/reject"

    export default{
        name: "XeerpaWidget",
        data(){
            return {
                currentTab: "info",
                likes: [],
                places: [],
                pages: [
                    {id: "560223434157939"},
                    {id: "1060328917312007"},
                    {id: "173636519358244"},
                    {id: "170582399700439"},
                    {id: "32127271213"},
                    {id: "355986757895"},
                    {id: "649675928460168"},
                    {id: "120211428054402"},
                    {id: "192555487582170"},
                    {id: "143798962303149"},
                    {id: "823490231105866"},
                    {id: "141447136006433"},
                    {id: "193071850788433"}
                ]
            }
        },
        props: {},
        components: {},
        mounted(){
            Facebook.getLikes(this.info.socialNetwork.token).then((likes) => {
                this.likes = likes;
            });
            Facebook.getLocations(this.info.socialNetwork.token).then((places) => {
                this.places = places;
            });
        },
        methods: {
            setTab(value){
                this.currentTab = value;
            }
        },
        computed: {
            info(){
                return this.$store.state.user.xeerpa;
            },
            user(){
                return this.info.user;
            },
            liked(){
                return filter(this.likes, (o) => {
                    return find(this.pages, {id: o.id});
                });
            },
            missing(){
                return reject(this.pages, (o) => {
                    return find(this.liked, {id: o.id});
                })
            }
        }
    }
</script>

<template>
    <div class="XeerpaWidget">
        <h2>Xeerpa</h2>
        <div class="buttons">
            <button @click="setTab('info')">Info</button>
            <button @click="setTab('likes')">Likes</button>
            <button @click="setTab('localization')">Localizacion</button>
        </div>
        <div v-show="currentTab == 'info'">
            <h5>Nombre: {{user.info.name.first}}</h5>
            <h5>Apellido: {{user.info.name.last}}</h5>
            <h5>Email: {{user.info.email}}</h5>
            <h5>Fecha de nacimiento:
                {{user.info.birthday.day}}/{{user.info.birthday.month}}/{{user.info.birthday.year}}</h5>
        </div>
        <div v-show="currentTab == 'likes'">
            <h5>liked</h5>
            <ul>
                <li v-for="page in liked">
                    <div class="fb-page"
                         :data-href="'https://www.facebook.com/'+page.id"
                         data-width="380"
                         data-small-header="true"
                         data-hide-cover="true"
                         data-show-facepile="false"
                         data-adapt-container-width="false"
                         data-show-posts="false"></div>
                </li>
            </ul>
            <h5>missing</h5>
            <ul>
                <li v-for="page in missing">
                    <div class="fb-page"
                         :data-href="'https://www.facebook.com/'+page.id"
                         data-width="380"
                         data-small-header="true"
                         data-hide-cover="true"
                         data-show-facepile="false"
                         data-adapt-container-width="false"
                         data-show-posts="false"></div>
                </li>
            </ul>
        </div>
        <div v-show="currentTab == 'localization' ">
            <ul>
                <li v-for="place in places">{{place.place.name}}, {{place.place.location.city}},
                    {{place.place.location.country}}
                </li>
            </ul>
        </div>
    </div>
</template>
