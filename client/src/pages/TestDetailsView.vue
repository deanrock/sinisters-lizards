<template>
  <div class="content">
    

    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <chart-card
          :chart-data="averageLatency.data"
          :chart-options="averageLatency.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Avg Latency</h4>
            <p class="category">
            </p>
          </template>

          <template slot="footer">
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <chart-card
          :chart-data="rps.data"
          :chart-options="rps.options"
          :chart-responsive-options="rps.responsiveOptions"
          :chart-type="'Line'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Requests per second</h4>
            <p class="category">
            </p>
          </template>

          <template slot="footer">
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Results</h4>
            <p class="category"></p>
          </md-card-header>
          <md-card-content>
            <TestResultsTable v-bind:results="results" table-header-color="orange"></TestResultsTable>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">Regions:</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab  v-for="item in results"   :key="item.region" :md-label="item.region"  md-icon="cloud">
                <nav-tabs-table v-bind:result="item"></nav-tabs-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  TestResultsTable
} from "@/components";

export default {
  components: {
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    TestResultsTable
  },
  computed: {
    averageLatency: function() {
      if (!this.results) {
        return;
      }
      console.log(this.results)
      let latencies = this.results.map(function(i) { return i.result.latencyAvg.replace('ms', '') });
      console.log(latencies)

      return {
        data: {
          labels: this.results.map(function(i) { return i.region }),
          series: [latencies,]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: Math.max(...latencies) * 1.2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      };
    },
    rps: function() {
      if (!this.results) {
        return;
      }
      let latencies = this.results.map(function(i) { return i.result.requestsPerSec });

      return {
        data: {
          labels: this.results.map(function(i) { return i.region }),
          series: [latencies,]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: Math.max(...latencies) * 1.2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      };
    }
  },
 beforeMount: async function() {
   let r = await fetch('/tests/' + this.$route.params.id);
   let xx = await r.json();
      this.results = xx.results;
      console.log(this.results)
      console.log('r')
  },
  data() {
    return {
      results: null,
      
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>
