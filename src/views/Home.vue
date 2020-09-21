<template>
  <div class="home">
    <div class="home-logo">
      <img alt="In-Check Logo" src="https://res.cloudinary.com/dpggcudix/image/upload/v1600723151/Screen_Shot_2020-09-21_at_5.18.44_PM_ypxsxh.png">
    </div>
    <div class="arrow-down"><i class="fas fa-chevron-down"></i></div>
    <div class="home-description">
      It's time you take control of your life. The fastest and most <br>
      efficient task management tool 
      on the market is now free and in the palm of your hands. <br>
      With In-Check, you can optimize your life by planning out your routines and <br>
      making sure you fulfill them.
      Register now for your chance to change your life!
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style>

.home-logo {
  height: 130%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.arrow-down {
  height: 20vh;
  font-size: 40px;
  color: purple;
}

</style>
