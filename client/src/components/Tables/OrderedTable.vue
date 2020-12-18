<template>
  <div>
    <md-table v-model="testResults" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item._id }} </md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Status">
          <p v-if="item.status == 'pending'">
            <md-icon>pending_actions</md-icon>
            {{ item.status }}
          </p>
          <p v-else>
            <md-icon>done_all</md-icon>
            {{ item.status }}
          </p>
          
        </md-table-cell>
        <md-table-cell md-label=""><a :href="'#/tests/' + item._id"> Details</a> </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
        content: 'loading',
        items: null,
        testResults: null
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

      var promise = fetch("tests")
      promise
        //.then(d => JSON.parse(d))
        .then(res => res.json())
        .then(d => {
          this.testResults = d
          this.items = d
          this.content = null
        })
        .catch(error => console.error(error))
    }
  }
};
</script>
