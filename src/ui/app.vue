<template lang="html">
    <div class="base">
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a v-bind:href="ssologin" class="waves-effect waves-light btn">Login</a>
                    <a href="#" data-target="collapse-menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="">Sass</a></li>
                        <li><a href="">Components</a></li>
                        <li><a href="">Javascript</a></li>
                        <li><a href="">Mobile</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <ul class="sidenav" id="collapse-menu">
            <li><a href="">Sass</a></li>
            <li><a href="">Components</a></li>
            <li><a href="">Javascript</a></li>
            <li><a href="">Mobile</a></li>
        </ul>

        <div class="container">
            <div class="sanity">{{message}}</div>
        </div>
        <div class="fixed-action-btn"><a href="#" class="btn-floating blue btn-large waves-effect">
        <i class="large material-icons">search</i></a>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component"

    @Component
    export default class App extends Vue {

        ssologin: string = '/nothing';
        message: string = "test message";

        onClick (): void {
            window.alert(this.message)
        }

        mounted() {
            fetch("http://localhost:2424/GetSSOURL")
            .then((response) => {
                return response.text();
            }).
            then((data) => {
                this.ssologin = data;
                console.log("Test: " + this.ssologin)
            });
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        color: green;
    }
</style>
