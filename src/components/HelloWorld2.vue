<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
  <div class="card card-bordered">
    <figure>
      <img
        class="mx-auto h-auto w-auto"
        src="@/assets/imgs/webcommLogo.png"
        alt="Workflow"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">FIDO LAB
        <div class="badge mx-2 badge-secondary">NEW</div>
      </h2>
      <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae
        voluptates incidunt iure sapiente.</p>
      <div class="justify-end card-actions">
        <button class="btn btn-secondary">More info</button>
      </div>
    </div>
  </div>
  <!-- <div class="card card-bordered">
    <div class="card-body">
      <h2 class="card-title">Image bottom</h2>
      <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae
        voluptates incidunt iure sapiente.</p>
      <div class="card-actions">
        <button class="btn btn-primary">Login</button>
        <button class="btn btn-ghost">Register</button>
      </div>
    </div>
    <figure>
      <img src="https://picsum.photos/id/1005/400/250">
    </figure>
  </div>
  <div class="card card-bordered">
    <figure>
      <img src="https://picsum.photos/id/1005/60/40" class="w-full">
    </figure>
    <div class="card-body">
      <h2 class="card-title">Small image file</h2>
      <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae
        voluptates incidunt iure sapiente.</p>
      <div class="card-actions">
        <div class="badge badge-ghost">Article</div>
        <div class="badge badge-ghost">Photography</div>
      </div>
    </div>
  </div> -->

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
