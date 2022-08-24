<template>

    <br>            <!--Infake form to get attendees's Info-->
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="text-center">Join Events</h1><br><br>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <p class="required">0. For which distribution are you signing up? </p>
                    <b-form-checkbox  v-for="event in events" :key="event._id" :value="event" v-model="attendee.event" required>
                        {{event.eventType}}, {{moment(event.date.slice(0,10)).format("MMMM Do")}}, {{event.location}}
                    </b-form-checkbox>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">1. First Name</p>
                    <input type="text" class="form-control" name="firstName" v-model="attendee.firstName" required>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">2. Last Name</p>
                    <input type="text" class="form-control" name="lastName" v-model="attendee.lastName" required>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">3. Phone Number</p>                                                 <!--validation to get correct phone number format-->
                    <input type="tel" id="phone" name="phone" placeholder="123-456-7890" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="attendee.phoneNumber" required>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">4. How did you hear about our distribution?</p>
                    <p id="skip">Check all that apply</p>
                    <b-form-checkbox v-for="item in choices" :key="item" :value="item" v-model="attendee.socialMedia" required> {{ item }} </b-form-checkbox>
                    <b-form-checkbox v-on:click="onclick"> Other: </b-form-checkbox>
                        <input type="text" class="form-control" :disabled='isDisabled' v-model="other">
                        <button name="btn" v-show="!isDisabled" @click="addType" required>+</button>
                    <br>
                    <span class="mt-3">Additional check: <strong>{{ other }}</strong> <br><label id="small">Do NOT forget to click PLUS button for optional</label></span>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">5. ZipCode</p>                   <!--validation to get 5 digits zipcode-->
                    <input type="tel" class="form-control" placeholder="12345" pattern="[0-9]{5}" v-model="attendee.zipCode" required>
                </div>
                <br>
                <div class="form-group">
                    <label class="required">6. Would you like to COVID vaccine on during the distribution?</label>
                    <p>During the distribution we will also provide free COVID vaccines on the campus.</p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }" required>                                                                         <!--To add spaces between texts-->
                        <b-form-radio v-model="attendee.COVID19.WantedCOVIDvaccine" :aria-describedby="ariaDescribedby" name="some-radios" value="Yes">Yes&emsp;&emsp;Skip to question 7</b-form-radio>
                        <b-form-radio v-model="attendee.COVID19.WantedCOVIDvaccine" :aria-describedby="ariaDescribedby" name="some-radios" value="No">No&emsp;&emsp;Skip to question 8</b-form-radio>
                    </b-form-group>
                </div>
                <br>
                <p id="skip">Skip to question 9</p>
                <h5>COVID Vaccine Preference</h5>
                <br>
                <div class="form-group">
                    <p class="required">7. Which COVID vaccine would you prefer to receive?</p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio v-model="attendee.COVID19.TypeOfVaccine" :aria-describedby="ariaDescribedby" name="some-radios1" value="Moderna">Moderna</b-form-radio>
                        <b-form-radio v-model="attendee.COVID19.TypeOfVaccine" :aria-describedby="ariaDescribedby" name="some-radios1" value="Pfizer">Pfizer</b-form-radio>
                    </b-form-group>
                </div>
                <br>
                <p id="skip">Skip to question 9</p>
                <h5>COVID Vaccine</h5>
                <br>
                <div class="form-group">
                    <p class="required">8. Have you received the COVID vaccine? </p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio v-model="attendee.COVID19.ReceivedVaccine" :aria-describedby="ariaDescribedby" name="some-radios2" value="Yes">Yes</b-form-radio>
                        <b-form-radio v-model="attendee.COVID19.ReceivedVaccine" :aria-describedby="ariaDescribedby" name="some-radios2" value="No">No</b-form-radio>
                    </b-form-group>
                </div>
                <br>
                <p id="skip">Skip to question 9</p>
                <h5>Additional Supportive Services</h5>
                <br>
                <div class="form-group">
                    <p class="required">9. Are you in need of additional supportive services (e.g., utility assistance, rental assistance, housing, nutritional support, etc.)? </p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }" required>
                        <b-form-radio v-model="attendee.servicesNeeding" :aria-describedby="ariaDescribedby" name="some-radios3" value="Yes">Yes</b-form-radio>
                        <b-form-radio v-model="attendee.servicesNeeding" :aria-describedby="ariaDescribedby" name="some-radios3" value="No">No</b-form-radio>
                    </b-form-group>
                </div>
                <br>
                <p id="skip">Skip to question 10</p>
                <h5>Additional Questions</h5>
                <br>
                <div class="form-group">
                    <p class="required">10. Number of Children In Household</p> <!--validation to get 2 digits num of children. A family seems not to have over 100 children-->
                    <input type="number" id="number" name="number" class="form-control" pattern="[0-9]{2}" v-model="attendee.numOfChildren" required>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">11. Are you or anyone in your household 65+ in age? </p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }" required>
                        <b-form-radio v-model="attendee.OverAge65" :aria-describedby="ariaDescribedby" name="some-radios4" value="Yes">Yes</b-form-radio>
                        <b-form-radio v-model="attendee.OverAge65" :aria-describedby="ariaDescribedby" name="some-radios4" value="No">No</b-form-radio>
                    </b-form-group>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">12. Are you a veteran?  </p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }" required>
                        <b-form-radio v-model="attendee.veteran" :aria-describedby="ariaDescribedby" name="some-radios5" value="Yes">Yes</b-form-radio>
                        <b-form-radio v-model="attendee.veteran" :aria-describedby="ariaDescribedby" name="some-radios5" value="No">No</b-form-radio>
                    </b-form-group>
                </div>
                <br>
                <div class="form-group">
                    <p class="required">13. Which of the following best describes you?</p>
                    <p>Mark only one oval. </p>
                    <b-form-group v-slot="{ ariaDescribedby }" required>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="Asian or Pacific Islander">Asian or Pacific Islander</b-form-radio>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="Black or African American">Black or African American</b-form-radio>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="Hispanic or Latino">Hispanic or Latino</b-form-radio>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="Native American or Alaskan Native">Native American or Alaskan Native</b-form-radio>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="White or Caucasian">White or Caucasian</b-form-radio>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="Multiracial or Biracial">Multiracial or Biracial</b-form-radio>
                        <b-form-radio v-model="attendee.Ethnicity" :aria-describedby="ariaDescribedby" name="some-radios6" value="A race/ethnicity not listed here">A race/ethnicity not listed here</b-form-radio>
                    </b-form-group>
                </div>
                <button class="btn btn-primary btn-lg btn-block">Join</button>
            </form>
        </div>
    </div>
</template>


<script type="text/javascript">
import axios from "axios";
var moment = require('moment');  // Using moment library to format the date type
export default {
    data() {
        return {     
            moment: moment,
            selected: [],
            events: null,
            choices: ['Facebook', 'Instagram', 'Twitter', 'Word of Mouth', 'KMAZ 102.5fm'],
            isDisabled: true,
            other: '',
            attendee: {
                firstName: '',
                lastName: '',
                phoneNumber:'',
                socialMedia: [],
                zipCode: '',
                COVID19: {
                    WantedCOVIDvaccine: '',
                    TypeOfVaccine: '',
                    ReceivedVaccine: ''
                },
                servicesNeeding: '',
                numOfChildren: '',
                OverAge65: '',
                veteran: '',
                Ethnicity: '',
                event: []
            }
        }
    },
    created() {
        let apiURL = 'http://localhost:3000/currentEvents'; //get the 3 most events from the API from the database
        axios.get(apiURL).then((res) => {
            console.log(res)
            this.events = res.data;
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        onclick() {
            this.isDisabled = !this.isDisabled
            if(this.selected.length) {
                this.selected = this.selected.filter(s => s !== this.other)
            }
            this.other = ''
        },
        addType() {            // trim all empty string in 'Other' Check box
            if (this.other.trim('').length > 0) {
                this.attendee.socialMedia.push(this.other)    // Push all input value for optional of 'Other' Check Box to Vue instance
            }
        },
        handleSubmitForm() {
            this.loading = true;
            let apiURL = 'http://localhost:3000/information';   // API to submit all attendees'info to the database
            axios.post(apiURL, this.attendee).then((res) => {
                console.log(res);
                // redirect user to the thank you page
                this.$router.push("/thanks")
                // if(!alert('You have joined the event successfully !!!')){window.location.reload();}
            }).catch(error => {
                console.log(error)
            })
        },
        postComment() {
            return this.attendee.socialMedia.filter((x) => x !== "")   // Get all true value, no empty string.
        }
    }
}
</script>

<style>
.required:after {    /* to create a red asterisk after each question and let user know input value is required */
    color: red;
    content: '*';
}
#small {
    color: #ffb3b3;
}
#skip {
    color: DarkGray;
}
</style>
