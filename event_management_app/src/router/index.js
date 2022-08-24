import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
                                        // create path for router-link
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/application',
    name: 'application',
    component: () => import('../components/InfakeForm')
  },
  {
    path: '/CreateEvent',
    name: 'CreateEvent',
    component: () => import('../components/CreateEvent')
  },
  {
    path: '/ViewEvent',
    name: 'ViewEvent',
    component: () => import('../components/ViewEvent')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditEvent')
  },
  {
    path: '/attendees',
    name: 'attendees',
    component: () => import('../components/Attendees')
  },
  {
    path: '/attendeeHistory/:id',
    name: 'attendeeHistory',
    component: () => import('../components/AttendeesHistory')
  },
  {
    path: '/tracking',
    name: 'tracking',
    component: () => import('../components/Tracking')
  },
  {
    path: '/trackingeventType/:type',
    name: 'trackingeventType',
    component: () => import('../components/TrackingType')
  },
  {
    path: '/trackingZipCode/:zipCode',
    name: 'trackingZipCode',
    component: () => import('../components/TrackingZipCode')
  },
  {
    path: '/trackingDate/:date',
    name: 'trackingDate',
    component: () => import('../components/TrackingDate')
  },
  {
    path: '/Summary',
    name: 'Summary',
    component: () => import('../components/SummaryGraph')
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: () => import('../components/ThankYou')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
