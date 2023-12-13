<template>
  <div id="app">
    <h1>Vehicles CRUD App</h1>
    <div>
      <form @submit.prevent="addVehicle">
        <label for="registration">Registration: </label>
        <input type="text" id="registration" v-model="newVehicle.registration" required />

        <label for="model">Model: </label>
        <input type="text" id="model" v-model="newVehicle.model" required />

        <label for="completed">Completed: </label>
        <input type="checkbox" id="completed" v-model="newVehicle.completed" required>

        <button type="submit">Add Vehicle</button>
      </form>

      <!-- Display -->

      <ul> 
        <li v-for="vehicle in vehicles" :key="vehicle.id">
          {{ vehicle.registration }} - {{ vehicle.model }}
          <button @click="deleteVehicle(vehicle.id)">Delete</button>
        </li>
        
      </ul>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
// import { response } from 'express';
export default {
  data() {
    return {
      newVehicle: { registration: "", model: "", completed: "" },
      vehicles: [],
    };
  },
  mounted() {
    // Fetch data from backend
    this.fetchVehicles();
  },
  methods: {
    fetchVehicles() {
      // use axios to fetch vehicles
      axios.get("http://localhost:3000/vehicles", {

        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjMwMjk2NiwiZXhwIjoxNzAyMzA2NTY2fQ.zXyS_S9NpIJzQjD7JOcswzN_MGOX3gODeF8bceNqicU`,
        },
        }).then((response) => {
          this.vehicles = response.data;
        }).catch((error) => {
          console.error("Error fetching vehicles:", error);
        });

    //   axios.get("http://localhost:3000/vehicles").then((response) => {
    //     this.vehicles = response.data;
    //   });
    },

    



    addVehicle() {
      axios.post("http://localhost:3000/vehicles", this.newVehicle).then(() => {
        this.fetchVehicles();
        this.newVehicle = { registration: "", model: "", completed: "" };
       });
    },

    // deleteVehicle(vehicleId) {
    //   axios.delete("http://localhost:3000/vehicles/${vehicleId}").then(() => {
    //     this.fetchVehicles();
    //   });
    // },
  },

};

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
  cursor: pointer;
}

</style>

