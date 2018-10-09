import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: 'https://d1ljaggyrdca1l.cloudfront.net/wp-content/uploads/2017/04/Beautiful-Mauritius-Beaches.jpg',
        id: 'image',
        title: 'Meetup in Port Louis',
        date: '2017-07-17',
        location: 'Port Louis',
        description: 'Port Louis, Mauritius'
      },
      {imageUrl: 'https://i.ytimg.com/vi/dZYpHr1wDmY/maxresdefault.jpg',
        id: 'image2',
        title: 'Meetup in Budapest',
        date: '2017-07-19',
        location: 'Budapest',
        description: 'Its in Budapest, Hungary'
      }
    ],
    user: {
      id: 'user1',
      registeredMeetups: ['image']
    }
  },
  mutations: {
    CreateMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'temperoryId'
      }
      // Reach out to fb and store it
      commit('CreateMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
