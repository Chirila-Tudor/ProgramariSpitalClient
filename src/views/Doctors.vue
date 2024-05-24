<script setup>
import doctor1Img from "@/assets/img/doctor1.jpeg";
import doctor2Img from "@/assets/img/doctor2.png";
import doctor3Img from "@/assets/img/doctor3.jpg";
import doctor4Img from "@/assets/img/doctor4.jpg";
import doctor5Img from "@/assets/img/doctor5.png";
import doctor6Img from "@/assets/img/doctor6.jpg";
import doctor7Img from "@/assets/img/doctor7.jpg";
import doctor8Img from "@/assets/img/doctor8.jpg";
import doctor9Img from "@/assets/img/doctor9.jpg";
import doctor10Img from "@/assets/img/doctor10.jpg";

const doctors = [
  {
    id: 1,
    name: "Dr. Ion Popescu",
    description: "Experiență în cardiologie și medicină internă.",
    photo: doctor1Img,
  },
  {
    id: 2,
    name: "Dr. Ana Ionescu",
    description: "Specializată în obstetrică și ginecologie.",
    photo: doctor3Img,
  },
  {
    id: 3,
    name: "Dr. Mihai Pop",
    description: "Expert în chirurgie ortopedică și medicină sportivă.",
    photo: doctor2Img,
  },
  {
    id: 4,
    name: "Dr. Elena Vlad",
    description: "Calificată în îngrijirea pediatrică și psihologia copilului.",
    photo: doctor4Img,
  },
  {
    id: 5,
    name: "Dr. Andrei Dobre",
    description:
      "Neurolog renumit cu expertiză în tratamentul accidentului vascular cerebral.",
    photo: doctor7Img,
  },
  {
    id: 6,
    name: "Dr. Laura Istrate",
    description: "Oferă servicii complete de medicină de familie.",
    photo: doctor6Img,
  },
  {
    id: 7,
    name: "Dr. Robert Mihail",
    description:
      "Oferă tratamente avansate în oncologie și îngrijirea cancerului.",
    photo: doctor5Img,
  },
  {
    id: 8,
    name: "Dr. Cristina Popa",
    description: "Specializată în dermatologie și proceduri cosmetice.",
    photo: doctor8Img,
  },
  {
    id: 9,
    name: "Dr. Vasile Neagu",
    description: "Experiență în gastroenterologie și sănătate digestivă.",
    photo: doctor9Img,
  },
  {
    id: 10,
    name: "Dr. Maria Popescu",
    description: "Chirurg priceput cu accent pe proceduri minim invazive.",
    photo: doctor10Img,
  },
];
</script>

<template>
  <div class="doctors-page">
    <h1>Meet Our Doctors</h1>
    <div class="doctors-list">
      <div v-for="doctor in doctors" :key="doctor.id" class="doctor">
        <div class="photo-container">
          <img :src="doctor.photo" :alt="doctor.name" class="doctor-photo" />
        </div>
        <h2>{{ doctor.name }}</h2>
        <p>{{ doctor.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doctors-page {
  padding: 20px;
}

h1 {
  text-align: center;
}

.doctors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.doctor {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.photo-container {
  width: 250px; /* Set width of photo container */
  height: 250px; /* Set height of photo container */
  margin: 0 auto 10px; /* Center photo container and add some bottom margin */
}

.doctor-photo {
  width: 100%; /* Make the image fill the container */
  height: 100%; /* Make the image fill the container */
  border-radius: 50%; /* Make the image circular */
  object-fit: cover; /* Ensure the image fills the container without stretching */
}
</style>
