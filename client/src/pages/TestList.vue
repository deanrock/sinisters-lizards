<template>
  <div>
    <div id="new-test-form">
    <md-button @click='toggle = !toggle' v-show='!toggle' id="formbutton"> Create new test</md-button>

    <div v-show='toggle' id="form">
      
  <form>
    <md-field>
      <label>Test name</label>
      <md-input v-model="model.name"></md-input>
    </md-field>
    <md-field>
      <label>URL to test </label>
      <md-input v-model="model.url"></md-input>
    </md-field>
    <md-field>
      <label> Concurrency </label>
      <md-input v-model="model.concurrency" type="number"></md-input>
    </md-field>
    <md-field>
      <label> Duration (seconds) </label>
      <md-input v-model="model.duration" type="number"></md-input>
    </md-field>
    <md-field>
      <label> Rate </label>
      <md-input v-model="model.rate" type="number"></md-input>
    </md-field>

    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="regions">AWS regions</label>
          <md-select v-model="model.regions" name="regions" multiple>
            <md-option value="us-east-1">US East 1 </md-option>
            <md-option value="us-east-2">US East 2 </md-option>
            <md-option value="us-west-1">US West 1 </md-option>
            <md-option value="us-west-2">US West 2 </md-option>
            <md-option value="ca-central-1">CA Central 1 </md-option>
            <md-option value="eu-west-1">EU West 1 </md-option>
            <md-option value="eu-west-2">EU West 2 </md-option>
            <md-option value="eu-west-3">EU West 3 </md-option>
            <md-option value="eu-central-1">EU Central 1 </md-option>
            <md-option value="eu-north-1">EU North 1 </md-option>
            <md-option value="ap-northeast-1">AP Northeast 1 </md-option>
            <md-option value="ap-northeast-2">AP Northeast 2 </md-option>
            <md-option value="ap-southeast-1">AP Southeast 1 </md-option>
            <md-option value="ap-southeast-2">AP Southeast 2 </md-option>
            <md-option value="ap-south-1">AP South 1 </md-option>
            <md-option value="sa-east-1">SA East 1 </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
      <md-button @click='submitForm'> Create new test</md-button>
     </form>
    </div>

    </div>
    

    <div class="content">
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card class="md-card-plain">
            <md-card-header data-background-color="green">
              <h4 class="title">List of all tests</h4>
              <p class="category">All test you wanted</p>
            </md-card-header>
            <md-card-content>
              <ordered-table></ordered-table>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { OrderedTable } from "@/components";

export default {
  components: {
    OrderedTable
  },
  data() { return{
    toggle: false,
    model: {
      regions: [],
      concurrency: 5,
      duration: 50,
      rate: 1000,
      url: "test.com",
      name: "Test name"
    }
  }
  },
  methods: {
    async submitForm() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.model.name,
            url: this.model.url,
            rate: this.model.rate,
            duration: this.model.duration,
            concurrency: this.model.concurrency,
            regions: this.model.regions,
          })
        };

      const response = await fetch("/tests", requestOptions);
      const data = await response.json();
  }

  }
  }
</script>


<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
  #form {
    margin-left: 50px;
  }
  #formbutton {
    margin-left: 50px;
  }

  #new-test-form {
    color: rgb(216, 246, 230);
  }
</style>