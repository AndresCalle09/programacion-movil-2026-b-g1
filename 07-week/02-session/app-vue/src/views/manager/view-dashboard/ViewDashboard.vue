<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="tabs-menu">
        <ion-button @click="vistaActual = Inventory">Inventario</ion-button>
        <ion-button @click="vistaActual = Order">Pedidos</ion-button>
        <ion-button @click="vistaActual = Profile">Perfil</ion-button>
      </div>

      <component :is="vistaActual" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import Inventory from '../view-inventory/ViewInventory.vue';
import Order from '../view-order/ViewOrder.vue';
import Profile from '../view-profile/ViewProfile.vue';

const vistaActual = ref(Inventory); // por defecto se muestra Inventario
</script>
