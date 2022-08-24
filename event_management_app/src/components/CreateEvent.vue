<template>
    <br><br>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="text-center">Create Event</h1>
            <!-- Form to create events-->
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Type</label>
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
                <button class="btn btn-danger mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";   // Axios package for REQUEST
    
    export default {             // Vue instance for Event
        data() {
            return {
                event: {
                   eventType: '',
                   date: '',
                   location: ''
                }
            }
        },
        methods: {               // handling create an event
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/event';
                
                axios.post(apiURL, this.event).then(() => {
                    //changing the view to the list
                    this.$router.push('/ViewEvent')
                    this.event = {
                    eventType: '',
                    date: '',
                    location: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }  
        }   
    }
</script>