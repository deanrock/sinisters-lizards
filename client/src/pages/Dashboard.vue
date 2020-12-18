<template>
  <div class="content">
    <div  class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      
      <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>task_alt</md-icon>
          </template>

          <template slot="content">
            <p class="category">Tests ran</p>
            <h3 class="title">
              {{ testsRan }}
            </h3>
          </template>
        </stats-card>

        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>desktop_windows</md-icon>
          </template>

          <template slot="content">
            <p class="category">Deployed regions</p>
            <h3 class="title">
              16
            </h3>
          </template>
        </stats-card>
      
    </div>
    <div>
      <img :src="imgLogo" alt="">
      <span class="dot" id="useast1"></span>
      <span class="dot" id="useast2"></span>
      <span class="dot" id="uswest1"></span>
      <span class="dot" id="uswest2"></span>

      <span class="dot" id="eucentral1"></span>
      <span class="dot" id="eucentral2"></span>


      <span class="dot" id="singapore"></span>
      <span class="dot" id="tokyo"></span>
      <span class="dot" id="sydney"></span>
    </div>
  </div>
</template>

<script>
import {
  StatsCard
} from "@/components";

export default {
  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/img/map.png")
    },
  },
  components: {
    StatsCard
  },
     
  data() {
    return {
      testsRan: 5
    }
  },
  mounted() {
    this.fetchTests()
  },
  methods: {
    fetchTests() {
      // const promise = new Promise( (res,rej) => {
      //     res(`[{"_id": "a9b72e3b-9a21-426e-bc0f-867e2e850ce6", "name": "testname1", "status": "pending"}, {"_id": "a9b72e3b-9a21-426e-bc0f-867e2e850ce7", "name": "testname2", "status": "done"}]`);
      // });

      var promise = fetch("/tests")
      promise
        //.then(d => JSON.parse(d))
        .then(res => res.json())
        .then(d => {
          this.testsRan = d.length
        })
        .catch(error => console.error(error))
    }
  }


};
</script>


<style>
@media screen and (min-width: 991px) {
  .dot{
    width: 10px;
    height: 10px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #fff;
    color: green;
    background: green;
    position: absolute;
  }

  #useast1 {
    top: 580px;
    left: 250px;
  }

  #useast2 {
    top: 580px;
    left: 240px;
  }

  #uswest1 {
    top: 580px;
    left: 100px;
  }

  #uswest2 {
    top: 580px;
    left: 110px;
  }

  #eucentral1 {
    left: 540px;
    top: 540px;
  }
  #eucentral2 {
    top: 510px;
    left: 520px;
  }


  #singapore {
    left: 540px;
    top: 540px;
  }
  #tokyo {
    left: 1020px;
    top: 580px;
  }
  #sydney {
left: 1070px;
top: 890px;
  }
}
</style>



