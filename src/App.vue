 <template>
  <router-view />
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  color: #2c3e50;
}

.route-transition-enter-active {
  animation: route-transition 0.2s;
}

.route-transition-leave-active {
  animation: route-transition 0.2s reverse;
}

@keyframes route-transition {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #cccccc;

  &:hover {
    background-color: #b2b2b2;
  }
}
</style>
