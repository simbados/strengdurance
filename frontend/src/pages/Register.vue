<template>
  <q-page padding class="column items-center justify-center">
    <q-card>
      <q-card-section class="bg-secondary">
        <h6>Register</h6>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="column items-center">
          <q-input
            filled
            v-model="username"
            label="Name"
            style="width: 20em; margin: 1em"
            :rules="[val => !!val || 'Field is required']"
          />
          <q-input
            filled
            v-model="email"
            label="E-mail"
            :rules="[isValidEmail]"
            style="width: 20em; margin: 1em"
          />
          <q-input
            v-model="password"
            filled
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            style="width: 20em; margin: 1em"
            :rules="[isValidPassword]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="confirmationPassword"
            filled
            label="Confirm password"
            :type="isPwd2 ? 'password' : 'text'"
            style="width: 20em; margin: 1em"
            :rules="[val => val === password || 'Passwords do not match']"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
          <q-btn
            style="margin: 1em"
            color="secondary"
            label="Register"
            @click="register"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        You already have an account? Than you can login
        <router-link to="/login">here</router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: null,
      password: null,
      email: null,
      confirmationPassword: null,
      isPwd: true,
      isPwd2: true,
    };
  },
  methods: {
    isValidEmail(email) {
      return new Promise(resolve => {
        setTimeout(() => {
          const regex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;
          const isValid = regex.test(email);
          this.$log.debug(isValid);
          resolve(isValid || 'Invalid email format');
        }, 1000);
      });
    },
    isValidPassword(password) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(!!password || 'Password must not be empty');
          // This is a more fine tuned password validation, maybe too much can be used later
          /* let regex = /(?=.*[a-z])/; */
          /* let isValid = regex.test(password); */
          /* this.$log.debug(isValid); */
          /* if (!isValid) { */
          /*   resolve( */
          /*     'Password must contain one lowercase alphabetical character', */
          /*   ); */
          /* } */
          /* regex = /(?=.*[A-Z])/; */
          /* isValid = regex.test(password); */
          /* if (!isValid) { */
          /*   resolve( */
          /*     'Password must contain one uppercase alphabetical character', */
          /*   ); */
          /* } */
          /* regex = /(?=.*[0-9])/; */
          /* isValid = regex.test(password); */
          /* if (!isValid) { */
          /*   resolve('Password must contain one numeric character'); */
          /* } */
          /* regex = /(?=.*[!@#$%^&*])/; */
          /* isValid = regex.test(password); */
          /* if (!isValid) { */
          /*   resolve('Password must contain one special character'); */
          /* } */
          /* regex = /(?=.{8,})/; */
          /* isValid = regex.test(password); */
          /* if (!isValid) { */
          /*   resolve('Password must be at lest 8 characters long'); */
          /* } */
          /* resolve(true); */
        }, 1000);
      });
    },
    register() {
      this.$store
        .dispatch('general/register', {
          vm: this,
          newUser: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        })
        .then(() => {
          this.$q.notify({
            message: 'Successfully registered your account',
            color: 'green',
          });
          this.$router.replace({ path: '/login' });
        })
        .catch(error => this.$q.notify({ message: error, color: 'red' }));
    },
  },
};
</script>
