<script setup>

import { useAuthStore } from "../../stores/AuthStore";

const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
        useAuthStore().logout();
    }
}
</script>

<template>
    <div class="container-xxl row">
        <div class="d-none d-md-block col-3">
            <div class="d-flex flex-column align-items-center">
                <router-link to="/area-do-barbeiro/inicio" class="menu-link" active-class="menu-link-active"> |
                    Início</router-link>
                <router-link to="/area-do-barbeiro/agendamentos" class="menu-link" active-class="menu-link-active"> |
                    Agendamentos</router-link>
                <router-link to="/area-do-barbeiro/servicos" class="menu-link" active-class="menu-link-active">|
                    Serviços</router-link>
                <router-link to="/area-do-barbeiro/horarios" class="menu-link" active-class="menu-link-active">|
                    Horários</router-link>
                <div class="menu-link" @click="handleLogout()">| Log-out</div>
            </div>
        </div>
        <div class="col col-md-9">
            <RouterView v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </RouterView>
        </div>
        <div class="d-md-none fixed-bottom my-2">
            <div class="mobile-menu container-fluid">
                <div class="d-flex justify-content-between">
                    <router-link to="/area-do-barbeiro/inicio" class="mobile-menu-link"
                        active-class="mobile-menu-link-active"><i class="bi bi-house-fill me-1"></i>Início</router-link>
                    <router-link to="/area-do-barbeiro/agendamentos" class="mobile-menu-link"
                        active-class="mobile-menu-link-active"><i
                            class="bi bi-calendar-event-fill me-1"></i>Agendamentos</router-link>
                    <router-link to="/area-do-barbeiro/servicos" class="mobile-menu-link"
                        active-class="mobile-menu-link-active"><i
                            class="bi bi-card-checklist me-1"></i>Serviços</router-link>
                    <router-link to="/area-do-barbeiro/horarios" class="mobile-menu-link"
                        active-class="mobile-menu-link-active">
                        <i class="bi bi-clock-fill me-1"></i>Horários
                    </router-link>
                    <div class="mobile-menu-link" @click="handleLogout()"><i class="bi bi-box-arrow-left"></i>Log-out
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu-link {
    width: 100%;
    height: 8vh;
    text-decoration: none;
    font-size: 1.3em;
    font-weight: 700;
    color: #212121;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.menu-link:hover {
    background-color: #bebebe;
}

.menu-link-active {
    background-color: #cacaca;
}

.mobile-menu {
    background-color: #fafafa;
    border-radius: 5px;
    padding: 1vh;
    box-shadow: 0px 0px 0px 1px #212121;
}

.mobile-menu-link {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #bebebe;
}

.mobile-menu-link-active {
    color: #212121;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>