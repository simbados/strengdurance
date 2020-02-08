<template>
  <q-page padding class="column items-center justify-center">
    <q-card>
      <q-card-section class="bg-secondary">
        <h6>Login</h6>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="column items-center">
          <q-input
            filled
            v-model="username"
            label="Name"
            style="max-width:20em; min-width: 15em; margin: 1em"
          />
          <q-input
            v-model="password"
            filled
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            style="max-width:20em; min-width: 15em; margin: 1em"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn
            style="margin: 1em"
            color="secondary"
            label="Login"
            @click="login"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        Do you have not an account yet? Just register
        <router-link to="/register">here</router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
      isPwd: true,
    };
  },
  methods: {
    login() {
      // TODO: implement login and store jwt
      // eslint-disable-next-line
      console.log('Login called');
    },
  },
};
</script>
