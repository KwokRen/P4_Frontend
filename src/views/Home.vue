<template>
  <div class="home">
    <div class="home-logo">
      <div class="logo-container">
        <img alt="In-Check Logo" src="https://res.cloudinary.com/dpggcudix/image/upload/v1600723151/Screen_Shot_2020-09-21_at_5.18.44_PM_ypxsxh.png">
      </div>
    </div>
    <a href="#home-description"><div class="arrow-down"><i class="fas fa-chevron-down"></i></div></a>
    <div class="white-space"></div>
    <div class="home-description" id="home-description">
      <p>It's time you take control of your life with In-Check!</p>
      <p>The fastest and most efficient task management tool on the market is now free and in the palm of your hands.</p>
      <p>Register now to start changing your life today!</p>
    </div>
    <footer class="copyright"><p>Copyright © 2020 In-Check</p>
    <a href="https://kwokren.github.io/PortfolioWebsite/projectOne/mainPage/" target="_blank"><img src="https://res.cloudinary.com/dpggcudix/image/upload/v1600736614/KR_-_Logo-05_bqxdie.png"></a>
    </footer>
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
  height: 75%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 90%;
}

.arrow-down {
  height: 10vh;
  font-size: 40px;
  color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-down > i {
  animation: bounce 4s ease infinite alternate;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-30px);
    }
    100% {
        transform: translateY(0);
    }
}

.white-space {
  height: 200px;
  width: 100vw;
}

#home-description {
  height: 87%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: purple;
  color: white;
  font-family: 'Roboto', sans-serif;
}

#home-description > p, #home-description > a > button {
  margin: 20px;
}

.copyright {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}

.copyright > a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
}

@media only screen and (min-width: 700px) {

  .home-logo {
    height: 70%;
  }

  #home-description {
    font-size: 30px;
  }

  .white-space {
    height: 150px
  }

  #home-description {
    height: 90%;
  }

  .copyright {
    height: 60px;
  }

  .copyright > a {
    height: 50px;
    width: 50px;
  }

}

@media only screen and (min-width: 1000px) {

  .home-logo {
    height: 65%;
  }

  #home-description {
    height: 70%;
  }

  .copyright {
    height: 80px;
    color: purple;
    font-size: 'Lato', sans-serif;
  }

  .copyright > a {
    height: 60px;
    width: 60px;
  }

}

@media only screen and (min-width: 1160px) {

  .home-logo {
    height: 45%;
  }

  #home-description {
    font-size: 35px;
    height: 47%;
  }

  .copyright {
    height: 100px;
    font-size: 20px;
  }

  .copyright > a {
    height: 70px;
    width: 70px;
  }

}

</style>
