<template>
    <br><br>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- Create Event content -->
            <h1 class="text-center">List of Events</h1>
            <br>
            <table class="table table-striped table-dark table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>                  <!-- Rendering data from Vue instance to the template -->
                    <tr v-for="(event, index) in Events" :key="event._id">
                        <td>{{ index + 1}}</td>
                        <td>{{ event.eventType }}</td>
                        <td>{{ event.location }}</td>
                        <td>{{ moment(event.date.slice(0,10)).format("L") }}</td>
                        <td>                                     <!--Get the event to be updated by _id-->
                            <router-link :to="{name: 'edit', params: { id: event._id }}" class="btn btn-success">Edit
                            </router-link>                       <!--btn to delete an event by _id-->
                        <button @click.prevent="deleteEvent(event._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    var moment = require('moment'); // Using moment library to format the date
    export default {
        data() {
            return {
                moment: moment,
                Events: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3000/events'; // Get all events all Database
            axios.get(apiURL).then(res => {
                this.Events = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteEvent(id){
                console.log(id)
                let apiURL = `http://localhost:3000/event/${id}`; //get _id to be deleted 
                let indexOfArrayItem = this.Events.findIndex(i => i._id === id); // Find the index of _id
                if (window.confirm("Do you really want to delete?")) { // Warning before deleting an event
                    axios.delete(apiURL).then(() => {
                        console.log(`An event has been deleted.`)
                        this.Events.splice(indexOfArrayItem, 1);  // get the starting and the ending of index
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>