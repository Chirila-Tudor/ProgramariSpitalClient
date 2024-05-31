<script setup>
import { ref, watch } from "vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";
import FormTitle from "../components/FormTitle.vue";
import { addNewEmployee } from "../services/user_service";
import router from "../router";

const username = ref("");
const role = ref("");
const email = ref("");

const errors = ref({
  username: "",
  role: "",
  email: "",
});

function redirectToAllUsers() {
  router.push("/all-users");
}

async function addEmployee() {
  for (const key in errors.value) {
    errors.value[key] = "";
  }

  let valid = true;
  if (!username.value) {
    errors.value.username = "Username is required";
    valid = false;
  }
  if (!role.value) {
    errors.value.role = "Role is required";
    valid = false;
  }
  if (!email.value) {
    errors.value.email = "Email is required";
    valid = false;
  }

  if (!valid) {
    return;
  }

  const employeeData = {
    username: username.value,
    role: role.value,
    email: email.value,
  };
  try {
    const response = await addNewEmployee(employeeData);
    if (response) {
      redirectToAllUsers();
    }
    console.log(response);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
}

watch(username, (newValue) => {
  if (errors.value.username && newValue) {
    errors.value.username = "";
  } else if (!newValue) {
    errors.value.username = "Username is required";
  }
});
watch(email, (newValue) => {
  if (errors.value.email && newValue) {
    errors.value.email = "";
  } else if (!newValue) {
    errors.value.email = "Email is required";
  }
});
watch(role, (newValue) => {
  if (errors.value.role && newValue) {
    errors.value.role = "";
  } else if (!newValue) {
    errors.value.role = "Role is required";
  }
});
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="title">
        <FormTitle label="Add Employee" class="title-width" />
      </div>
      <div class="input-group">
        <label for="username-input">Username:</label>
        <div v-if="errors.username" class="error-message">
          {{ errors.username }}
        </div>
        <CustomInput
          type="text"
          id="username-input"
          placeholder="Username"
          v-model:model-value="username"
        />
      </div>
      <div class="input-group">
        <label for="role-input">Role:</label>
        <div v-if="errors.role" class="error-message">
          {{ errors.role }}
        </div>
        <CustomInput
          type="text"
          id="role-input"
          placeholder="Role"
          v-model:model-value="role"
        />
      </div>
      <div class="input-group">
        <label for="email-input">Email:</label>
        <div v-if="errors.email" class="error-message">
          {{ errors.email }}
        </div>
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
.error-message {
  color: red;
  font-size: 12px;
  font-weight: bold;
}
</style>
