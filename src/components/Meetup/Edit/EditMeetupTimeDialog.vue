<template>
  <v-dialog width="350px" persistant v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap> 
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="..." actions>
              <template>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="editDialog = false">Close</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      // const hours = this.editableTime.match(/^(\d+)/)[1]
      // const minutes = this.editableTime.match(/:(\d+)/)[1]
      // console.log('editabletime is ', this.editableTime)
      let h = this.editableTime.substring(0, 2)
      let m = this.editableTime.substring(3, 5)
      console.log(' h is ', h)
      console.log(' m is ', m)
      newDate.setHours(h)
      newDate.setMinutes(m)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created () {
    let d = new Date(this.meetup.date)
    console.log('d is ', d)
    // this.editableTime = d.toLocaleString()
  }
}
</script>