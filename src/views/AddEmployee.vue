<script setup>
import { ref } from "vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";
import FormTitle from "../components/FormTitle.vue";
import { addNewEmployee } from "../services/user_service";
import router from "../router";

const username = ref("");
const role = ref("");
const email = ref("");

async function addEmployee() {
  const employeeData = {
    username: username.value,
    role: role.value,
    email: email.value,
  };
  try {
    const response = await addNewEmployee(employeeData);
    if (response) {
      router.push("/");
    }
    console.log(response);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Add Employee" class="title-width" />
      </div>
      <div class="input-group">
        <label for="username-input">Username:</label>
        <CustomInput
          type="text"
          id="username-input"
          placeholder="Username"
          v-model:model-value="username"
        />
      </div>
      <div class="input-group">
        <label for="role-input">Role:</label>
        <CustomInput
          type="text"
          id="role-input"
          placeholder="Role"
          v-model:model-value="role"
        />
      </div>
      <div class="input-group">
        <label for="email-input">Email:</label>
        <CustomInput
          type="email"
          id="email-input"
          placeholder="Email"
          v-model:model-value="email"
        />
      </div>
      <div class="button-group">
        <CustomButton id="add-employee" @click="addEmployee" class="white-text"
          >Add Employee</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.form-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 30vh;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.label {
  margin-bottom: 5px;
  font-weight: bold;
}

.title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 30px;
}

.material-symbols-outlined {
  font-size: 24px;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: center;
  text-align: center;
}

.white-text {
  color: white;
}
.title-width {
  width: 30vh;
}
</style>
