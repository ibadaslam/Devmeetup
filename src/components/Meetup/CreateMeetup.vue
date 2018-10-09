<template>
<v-container>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h2>Create a new Meetup</h2>
        </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <form @submit.prevent="onCreateMeetup" action="">
                <v-layout row>
                  <v-flex>
                    <v-text-field name="title" 
                    label="Title" 
                    id="title" 
                    v-model="title" 
                    :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-text-field 
                    name="location" 
                    label="Location" 
                    id="location" 
                    v-model="location" 
                    :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-text-field 
                    name="imageUrl" 
                    label="Image URL" 
                    id="image-url" 
                    v-model="imageUrl" 
                    :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6>
                    <img :src="imageUrl" height="300" alt="">
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-textarea 
                      name="description" 
                      label="Description" 
                      id="description" 
                      v-model="description" 
                      multi-line 
                      ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                  <h3>Choose a date & Time</h3>
                  </v-flex>
                </v-layout>
                <v-layout row class="mb-2">
                  <v-flex xs12 sm6 offset-sm3>
                    <v-date-picker v-model="date"></v-date-picker>
                    <p>{{date}}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-time-picker v-model="time" format="24hr"></v-time-picker>
                     <p>{{time}}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-btn 
                    class="primary" 
                    :disabled="!formIsValid"
                    type="submit"
                    >Create Meetup</v-btn>
                  </v-flex>
                </v-layout>
            </form>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: null,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
      this.location !== '' &&
      this.imageUrl !== '' &&
      this.description !== '' &&
      this.date !== null &&
      this.time !== null
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (this.time !== null) {
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
        // time: this.time
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
