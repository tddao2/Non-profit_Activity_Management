<template>
    <br><br><br><br><br><br><br>    
    <div class="row justify-content-center">
        <div class="col-md-10">
            <h1 class="text-center" v-for="info in Infos" :key="info._id">{{ info.firstName }} {{ info.lastName }}'s History</h1>  <!--render name of attendees-->
            <br>
            <table class="table table-striped table-dark table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Wanted COVID vaccine</th>
                        <th>Type</th>
                        <th>Received</th>
                        <th>Services Needing</th>
                        <th>Children</th>
                        <th>65+</th>
                        <th>Veteran</th>
                        <th>Ethnicity</th>
                        <th> # Events Joined</th>
                        <th>Social Media</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="info in Infos" :key="info._id">               <!--Attendee's COVID and other details-->
                        <td>{{ info.firstName }} {{ info.lastName }}</td>
                        <td>{{ info.COVID19.WantedCOVIDvaccine }}</td>
                        <td>{{ info.COVID19.TypeOfVaccine }}</td>
                        <td>{{ info.COVID19.ReceivedVaccine }}</td>
                        <td>{{ info.servicesNeeding }}</td>
                        <td>{{ info.numOfChildren }}</td>
                        <td>{{ info.OverAge65 }}</td>
                        <td>{{ info.veteran}}</td>
                        <td>{{ info.Ethnicity }}</td>
                        <td>{{ info.Count }}</td>   <!--Count how many times attendee access the services-->
                        <td >{{ info.socialMedia.join(', ') }}</td>   <!--Ways the attendee has accessed their services-->
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>    <!--Go back to previous page-->
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            Infos: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/attendeeHistory/${this.$route.params.id}`;   // get all attendee's Info by _id from Attendees components
        axios.get(apiURL).then((res) => {
            this.Infos = res.data;
        })
    } 
}
</script> 
