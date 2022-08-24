<template>    <!--The page for tracking Info relating to the event by Zipcode, DATE, and EventType -->
    <br><br><br><br><br><br><br>
    <form class="row g-3 justify-content-center">
        <div class="col-md-3">
            <label class="form-label"><strong>Event Type</strong></label>
            <select class="form-select" v-model="selected1" required>
                <option selected disabled>Choose...</option>
                <option v-for="item in eventTypes" :key="item">{{item._id}}</option>       <!--Rendering data from the Vue Instance-->
            </select>
            <button v-on:click="GO1" class="btn btn-info mt-3">GO</button>                 <!--redirect to the view of all attendees by eventType-->
        </div>
        <div class="col-md-3">
            <label class="form-label"><strong>Zip Code</strong></label>
            <select class="form-select" v-model="selected2" required>
                <option selected disabled>Choose...</option>
                <option v-for="item in zipCodes" :key="item">{{item._id}}</option>          <!--Rendering data from the Vue Instance-->
            </select>
            <button v-on:click="GO2" class="btn btn-info mt-3">GO</button>                  <!--redirect to the view of all attendees by zipcode-->
        </div>
        <div class="col-md-3">
            <label class="form-label"><strong>Date</strong></label>
            <select class="form-select" v-model="selected3" required>
                <option selected disabled>Choose...</option>                               <!--Rendering data from the Vue Instance and use moment library to format the date-->
                <option v-for="item in dates" :key="item" :value="item._id.toString()">{{ moment(item._id.slice(0,10)).format("L") }}</option>
            </select>
            <button v-on:click="GO3" class="btn btn-info mt-3">GO</button>                 <!--redirect to the view of all attendees by the date-->
        </div>
    </form>
</template>

<script>
    import axios from "axios";
    var moment = require('moment');
    export default {
        data() {
            return {
                moment: moment,
                eventTypes: [],
                zipCodes: [],
                dates: [],
                selected1: null,
                selected2: null,
                selected3: null
            }
        },
        created() {
            let apiURL_1 = axios.get('http://localhost:3000/allEvents');  // Get all DISTINCT events from the database
            let apiURL_2 = axios.get('http://localhost:3000/AllzipCode'); // Get all DISTINCT zipcode from the database
            let apiURL_3 = axios.get('http://localhost:3000/Alldates');   // Get all DISTINCT dates from the database
            
            axios.all([apiURL_1, apiURL_2, apiURL_3]).then(axios.spread((first_response, second_response, third_response) => {
                this.eventTypes = first_response.data
                this.zipCodes = second_response.data
                this.dates = third_response.data
            })).catch(error => {
                console.log(error)
            });
        },
        methods: {
            GO1() {
                this.$router.push({ name: 'trackingeventType', params: { type: this.selected1}})   // The route redirects to the view of all attendees by eventType
            },
            GO2() {
                this.$router.push({ name: 'trackingZipCode', params: { zipCode: this.selected2}})  // The route redirects to the view of all attendees by Zipcode
            },
            GO3() {
                this.$router.push({ name: 'trackingDate', params: { date: this.selected3}})        // The route redirects to the view of all attendees by Date
            }
        }
           
    }
</script> 
