<template>
    <br><br>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- Show Attendees content -->                       <!--Rendering the zipcode-->
            <h1 class="text-center">Attendees Located at Zipcode {{this.$route.params.zipCode}}</h1>
            <h3 class="text-center"> Total: {{this.Attendees.length}} </h3> <!--Get number of attendees joined in the specific zipcode-->
            <br>
            <table class="table table-striped table-dark table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>                          <!--Attendees' Info-->
                    <tr v-for="(attendee, index) in Attendees" :key="attendee._id">
                        <td>{{ index + 1}}</td>     <!--Get index starting from 1-->
                        <td>{{ attendee.firstName }}</td>
                        <td>{{ attendee.lastName }}</td>
                        <td>{{ attendee.phoneNumber }}</td>
                        <td>{{ attendee.zipCode }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>      <!--Go back to the previous page-->
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
            let apiURL = `http://localhost:3000/zipCode/${this.$route.params.zipCode}`;       // API to get all attendees'Info by zipcode
            axios.get(apiURL).then(res => {
                this.Attendees = res.data;
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>
