<template>         <!--The page to present the summary of recent events-->
    <br><br><br><br><br><br><br>
    <form class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="text-center"><strong>Summary Graph for Recent Events</strong></h1><br>
            <line-chart :data="data" xtitle="Events" ytitle="Number of Participants" :curve="false" loading="Loading..." empty="No data"/>
        </div>                                  <!--The code to create MULTIPLE SERIES GRAPH-->
    </form>
</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            data: ''
        }
    },
    created() {
        let apiURL_1 = axios.get('http://localhost:3000/AttendeesJoined');    //  get number of attendees join events in different EventType
        let apiURL_2 = axios.get('http://localhost:3000/VaccinatedAttendees');  // get number of attendees who RECEIVED Covid19 vaccine in different EventType
        let apiURL_3 = axios.get('http://localhost:3000/WantedVaccine'); // get number of attendees who WANTED Covid19 vaccine in different EventType
        axios.all([apiURL_1, apiURL_2, apiURL_3]).then(axios.spread((first_response, second_response, third_response) => {
            this.data = [                                                // Format the data from API to match the data of multiple series Graph
                {name: 'Number of Attendees', data: first_response.data.reduce(function(result, current) {return Object.assign(result, current);}, {})},
                {name: 'Vaccinated', data: second_response.data.reduce(function(result, current) {return Object.assign(result, current);}, {})},
                {name: 'Wanted COVID19 Vaccine', data: third_response.data.reduce(function(result, current) {return Object.assign(result, current);}, {})}
            ]
        })).catch(error => {
            console.log(error)
        });
    }
}
</script>