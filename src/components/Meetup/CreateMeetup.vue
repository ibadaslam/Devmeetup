<template>
<v-container>
    <v-layout row wrap >
        <v-flex sm6 offset-sm5 >
            <h2>Create a new Meetup</h2>
        </v-flex>
        <v-flex>
            <form @submit.prevent="onCreateMeetup" action="">
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field name="title" 
                    label="Title" 
                    id="title" 
                    v-model="title" 
                    :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
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
                  <v-flex xs12 sm6 offset-sm3>
                    <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                    <input 
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked">
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <img :src="imageUrl" height="300" alt="">
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field 
                      name="description" 
                      label="Description" 
                      id="description" 
                      v-model="description" 
                      multi-line 
                      ></v-text-field>
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
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-time-picker v-model="time" format="24hr"></v-time-picker>
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
      image: null,
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
      if (!this.image) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
        // time: this.time
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
