<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Create new test</h4>
      </md-card-header>

      <md-card-content>
        
        <div class="md-layout">
          
            <md-field>
      <label>Test name</label>
      <md-input v-model="name"></md-input>
    </md-field>
    <md-field>
      <label>URL to test </label>
      <md-input v-model="url"></md-input>
    </md-field>
    <div class="md-layout-item md-small-size-100 md-size-33">
    <md-field>
      <label> Concurrency </label>
      <md-input v-model="concurrency" type="number"></md-input>
    </md-field>
    </div>
    <div class="md-layout-item md-small-size-100 md-size-33">
    <md-field>
      <label> Duration (seconds) </label>
      <md-input v-model="duration" type="number"></md-input>
    </md-field>
    </div>
    <div class="md-layout-item md-small-size-100 md-size-33">
    <md-field>
      <label> Rate </label>
      <md-input v-model="rate" type="number"></md-input>
    </md-field>

    <md-field>
          <label for="regions">AWS regions</label>
          <md-select v-model="regions" name="regions" multiple>
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
          
         
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click='submitForm'>Create new test</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    async submitForm() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            url: this.url,
            rate: this.rate,
            duration: this.duration,
            concurrency: this.concurrency,
            regions: this.regions,
          })
        };

      const response = await fetch("/tests", requestOptions);
      const data = await response.json();
    }
  },
  data() {
    return {
      regions: [],
      concurrency: 5,
      duration: 50,
      rate: 1000,
      url: "test.com",
      name: "Test name",
      username: null,
      disabled: null,
      emailadress: null,
      lastname: null,
      firstname: null,
      address: null,
      city: null,
      country: null,
      code: null,
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
    };
  }
};
</script>
<style></style>
