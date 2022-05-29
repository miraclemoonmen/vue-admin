 <template>
  <router-view />
</template>

<style lang="scss">
@media screen and (max-width: 1919px) {
  html {
    font-size: 13px !important;
  }
}

html,
body,
#app {
  height: auto;
  min-height: 100vh;
  font-size: 16px;
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
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background-color: #cccccc;

  &:hover {
    background-color: #b2b2b2;
  }
}

::-webkit-scrollbar-track {
  margin: 5px 0px;
}

.dark {
  ::-webkit-scrollbar-thumb {
    background-color: rgba(71,81,96, 0.7);
    &:hover {
      background-color: rgba(98,108,123, 0.7);
    }
  }
}
</style>
