<template>
  <f7-login-screen :opened="loginScreenOpened" @loginscreen:closed="loginScreenOpened = false">
    <f7-page login-screen>
      <f7-login-screen-title>{{isEntered ? 'Войти' : 'Регистрация'}}</f7-login-screen-title>
      <f7-list form>
        <f7-list-input
          label="Логин или email"
          type="text"
          placeholder="Ваш логин или email"
          :value="login"
          @input="login = $event.target.value"
          clear-button
        ></f7-list-input>
        <f7-list-input
          label="Пароль"
          type="password"
          placeholder="Ваш пароль"
          :value="password"
          @input="password = $event.target.value"
          clear-button
        >
          <i class="fa fa-lock" aria-hidden="true"></i>
        </f7-list-input>
      </f7-list>
      <f7-list>
        <f7-list-button
          @click="actionType = (isEntered ? 'reg' : 'enter')"
        >{{isEntered ? 'Еще не зарегистрированны?' : 'Уже есть акаунт? Войти'}}</f7-list-button>
        <f7-block>
          <f7-button fill round @click="sent">{{isEntered ? 'Войти' : 'Зарегистрироваться'}}</f7-button>
        </f7-block>
      </f7-list>
    </f7-page>
  </f7-login-screen>
</template>

<script>
import Store from "../core/Store";

export default {
  data() {
    return {
      loginScreenOpened: true,
      actionType: "enter",
      password: "",
      login: ""
    };
  },
  computed: {
    isEntered() {
      return this.actionType === "enter";
    }
  },
  created() {
    // this.login = "Dev";
    // this.password = "Dev";
    // setTimeout(()=>this.sent(), 100);
  },
  methods: {
    sent() {
      const { login, password } = this;
      const app = this.$f7;
      if (!login.length || !password.length) {
        return app.dialog.alert(`
        <b class="big">Логин и пароль введены неверно</b>
        <br>
        <br>
        <span class="small">Вы забыли логин  или пароль? Попробуйте <a>восстановить его</a></span>`);
      }
      Store.user.login = login;
      Store.user.isLogged = true;
     
      Store.loadWalletsData();
      setTimeout(() => {
        app.loginScreen.close();
        app.notification
          .create({
            icon: '<i class="txt-green fa fa-btc" aria-hidden="true"></i>',
            title: "P2P Exchange",
            subtitle: "Успешный вход!",
            text: "Здравcтсвуйте, " + login + "!",
            closeButton: true,
            closeTimeout: 2000
          })
          .open();
      }, 3000);
    }
  }
};
</script>
