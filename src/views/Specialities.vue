<script setup>
const departments = [
  {
    id: 1,
    name: "Departamentul de Cardiologie",
    description:
      "Departamentul nostru de cardiologie se specializează în diagnosticarea și tratarea afecțiunilor cardiace.",
    relatedServices: ["Cardiologie", "Medicină Internă"],
  },
  {
    id: 2,
    name: "Departamentul de Ortopedie",
    description:
      "Departamentul nostru de ortopedie se concentrează pe afecțiunile și leziunile musculoscheletale.",
    relatedServices: ["Chirurgie Ortopedică", "Medicină Sportivă"],
  },
  {
    id: 3,
    name: "Departamentul de Neurologie",
    description:
      "Departamentul de neurologie oferă diagnostic și tratament pentru afecțiunile sistemului nervos.",
    relatedServices: [
      "Neurologie",
      "Tratament pentru Accident Vascular Cerebral",
    ],
  },
  {
    id: 4,
    name: "Departamentul de Oncologie",
    description:
      "Departamentul nostru de oncologie se specializează în diagnosticarea și tratamentul cancerului.",
    relatedServices: ["Oncologie", "Chimioterapie", "Radioterapie"],
  },
  {
    id: 5,
    name: "Departamentul de Gastroenterologie",
    description:
      "Departamentul de gastroenterologie se concentrează pe sistemul digestiv și afecțiunile sale asociate.",
    relatedServices: ["Gastroenterologie", "Sănătate Digestivă"],
  },
  {
    id: 6,
    name: "Departamentul de Psihiatrie",
    description:
      "Departamentul nostru de psihiatrie oferă evaluare, diagnostic și tratament pentru afecțiunile de sănătate mintală.",
    relatedServices: ["Psihiatrie", "Terapie Psihologică"],
  },
  {
    id: 7,
    name: "Departamentul de Dermatologie",
    description:
      "Departamentul de dermatologie se specializează în diagnosticarea și tratamentul afecțiunilor pielii.",
    relatedServices: ["Dermatologie", "Proceduri Cosmetice"],
  },
];
</script>

<template>
  <div class="departments-description">
    <h2 class="section-title">Departamentele Noastre</h2>
    <div
      v-for="department in departments"
      :key="department.id"
      class="department"
    >
      <h3 class="department-name">{{ department.name }}</h3>
      <p class="department-description">{{ department.description }}</p>
      <p class="related-services">
        Servicii Conexe:
        <span>{{ department.relatedServices.join(", ") }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.departments-description {
  padding: 20px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.department {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.department-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.department-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.related-services {
  font-size: 14px;
}

.related-services span {
  font-weight: bold;
  color: #8b0000;
}
</style>
