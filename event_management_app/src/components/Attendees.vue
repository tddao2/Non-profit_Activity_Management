<template>
    <br><br>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Show Attendees Information -->
            <h1 class="text-center">List of Attendees</h1>
            <h3 class="text-center"> Total: {{this.Attendees.length}} </h3> <!--get number of attendees of all events-->
            <br>
            <table class="table table-striped table-dark table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Zip Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>                              <!--Rendering data from Vue Instance to the template-->
                    <tr v-for="(attendee, index) in Attendees" :key="attendee._id">
                        <td> {{ index + 1}}</td>    <!-- Get index starting from 1 -->
                        <td> {{ attendee.firstName }}</td>
                        <td> {{ attendee.lastName }}</td>
                        <td> {{ attendee.phoneNumber }}</td>
                        <td> {{ attendee.zipCode }}</td>
                        <td>
                            <router-link :to="{name: 'attendeeHistory', params: { id: attendee._id }}" class="btn btn-outline-info">More Details
                            </router-link>    <!--redirect users to view more Info about COVID19 details of attendees-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    
    export default {
        data() {
            return {
                Attendees: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3000/attendees'; //get all attendees's Info from the database
            axios.get(apiURL).then(res => {
                this.Attendees = res.data;
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>