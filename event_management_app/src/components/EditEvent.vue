<template>
    <br><br><br><br><br><br><br>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Event content -->
            <h3 class="text-center">Update Event</h3>
            <form @submit.prevent="handleUpdateForm">       <!--Handling submit form-->
                <div class="form-group">
                    <label>Type</label>                     <!-- Rendering data from Vue instance to the template -->
                    <input type="text" class="form-control" v-model="event.eventType" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" class="form-control" v-model="event.location" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="event.date" required>
                </div>
                <button class="btn btn-danger mt-3">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            event: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/event/${this.$route.params.id}`;  // Get _id from ViewEvent to get event' info from Database
        axios.get(apiURL).then((res) => {
            this.event = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/event/${this.$route.params.id}`; // After editing event, using the _id of event and updating to the database
            axios.put(apiURL, this.event).then((res) => {
                console.log(res)
                this.$router.push('/ViewEvent')          // Go back to ViewEvent
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script> 