<script setup>

</script>

<template>
    <div class="container-xxl row">
        <div class="d-none d-md-block col-3">
            <div class="d-flex flex-column align-items-center">
                <router-link to="/area-do-gerente/inicio" class="menu-link" active-class="menu-link-active"> |
                    Início</router-link>
                <router-link to="/area-do-gerente/funcionarios" class="menu-link" active-class="menu-link-active"> |
                    Funcionários</router-link>
                <router-link to="/area-do-gerente/estoque" class="menu-link" active-class="menu-link-active">|
                    Estoque</router-link>
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
                    <router-link to="/area-do-gerente/inicio" class="mobile-menu-link"
                        active-class="mobile-menu-link-active"><i class="bi bi-house-fill me-1"></i>Início</router-link>
                    <router-link to="/area-do-gerente/funcionarios" class="mobile-menu-link"
                        active-class="mobile-menu-link-active"><i
                            class="bi bi-people-fill me-1"></i>Funcionários</router-link>
                    <router-link to="/area-do-gerente/estoque" class="mobile-menu-link"
                        active-class="mobile-menu-link-active"><i class="bi bi-box-seam-fill"></i>Estoque</router-link>
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