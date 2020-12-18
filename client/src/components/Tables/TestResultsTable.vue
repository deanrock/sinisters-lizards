<template>
  <div>
    <md-table v-model="results" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Region">{{ item.region }}</md-table-cell>
        <md-table-cell md-label="RPS">{{ item.result.requestsPerSec }}</md-table-cell>
        <md-table-cell md-label="Avg Latency">{{ item.result.latencyAvg }}</md-table-cell>
        <md-table-cell md-label="Max Latency">{{ item.result.latencyMax }}</md-table-cell>
        <md-table-cell md-label="Stdev Latency">{{ item.result.latencyStdev }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "test-results",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    results: {
      type: Array
    }
  },
  data() {
    return {
      selected: [],
    };
  }
};
</script>
