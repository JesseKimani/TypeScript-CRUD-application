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
        <input type="checkbox" id="completed" v-model="newVehicle.completed">

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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjg4NDQ5OSwiZXhwIjoxNzAyODg4MDk5fQ.29gWV1DDMqj_e7WyjQ06I96uwuRy0g15u0rgvgpv44s`,
        },
        }).then((response) => {
          this.vehicles = response.data;
        }).catch((error) => {
          console.error("Error fetching vehicles:", error);
        });
    },

  addVehicle() {
    console.log("Adding vehicle...");
    axios.post("http://localhost:3000/vehicles", this.newVehicle , {
      headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjg4NDQ5OSwiZXhwIjoxNzAyODg4MDk5fQ.29gWV1DDMqj_e7WyjQ06I96uwuRy0g15u0rgvgpv44s`,
        },
    })
      .then(() => {
        this.fetchVehicles();
        this.newVehicle = { registration: "", model: "", completed: "" };
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
    },

    deleteVehicle(vehicleId) {
      axios.delete(`http://localhost:3000/vehicles/${vehicleId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjg4NDQ5OSwiZXhwIjoxNzAyODg4MDk5fQ.29gWV1DDMqj_e7WyjQ06I96uwuRy0g15u0rgvgpv44s`,
        },
      })
        .then(() => {
          this.fetchVehicles();
        })
        .catch((error) => {
          console.error(`Error deleting vehicle with ID ${vehicleId}:`, error);
        });
    },
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

