<template>
  <div class="content">
    {{ $route.params.id }}

    Detailed view of test -> list all different regions results and add some nice graphs!
    API: /tests/:testId
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
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revenue</p>
            <h3 class="title">$34,245</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last 24 Hours
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">Used Space</p>
            <h3 class="title">
              49/50
              <small>GB</small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">Get More Space...</a>
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Fixed Issues</p>
            <h3 class="title">75</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
              Tracked from Github
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fab fa-twitter"></i>
          </template>

          <template slot="content">
            <p class="category">Folowers</p>
            <h3 class="title">+245</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
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
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">Tasks:</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="Bugs" md-icon="bug_report">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-pages" md-label="Website" md-icon="code">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-posts" md-label="server" md-icon="cloud">
                <nav-tabs-table></nav-tabs-table>
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
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  TestResultsTable
} from "@/components";

const promise = new Promise( (res,rej) => {
    
    res("[{data: data}]");
});

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    TestResultsTable
  },
  computed: {
    averageLatency: function() {
      let latencies = this.results.map(function(i) { return i.result.latencyAvg.replace('ms', '') });

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
  data() {
    return {
      results: [
        {
          region: 'us-east-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.98,
            requestsTotal: 20,
            durationActual: '2.00s',
            transferTotal: '7.29KB',
            latencyAvg: '72.13ms',
            latencyStdev: '19.25ms',
            latencyMax: '129.92ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'us-east-2',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '78.80ms',
            latencyStdev: '21.47ms',
            latencyMax: '148.74ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'us-west-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '25.72ms',
            latencyStdev: '6.55ms',
            latencyMax: '45.18ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'us-west-2',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '15.45ms',
            latencyStdev: '3.89ms',
            latencyMax: '28.37ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'ca-central-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '68.20ms',
            latencyStdev: '18.23ms',
            latencyMax: '123.14ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'eu-west-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '160.14ms',
            latencyStdev: '43.95ms',
            latencyMax: '274.69ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'eu-west-2',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.98,
            requestsTotal: 20,
            durationActual: '2.00s',
            transferTotal: '7.29KB',
            latencyAvg: '148.07ms',
            latencyStdev: '40.29ms',
            latencyMax: '258.18ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'eu-west-3',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '159.23ms',
            latencyStdev: '43.81ms',
            latencyMax: '276.22ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'eu-central-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '166.09ms',
            latencyStdev: '45.74ms',
            latencyMax: '282.88ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'eu-north-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '196.98ms',
            latencyStdev: '54.61ms',
            latencyMax: '316.16ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'ap-northeast-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.98,
            requestsTotal: 20,
            durationActual: '2.00s',
            transferTotal: '7.29KB',
            latencyAvg: '102.16ms',
            latencyStdev: '27.52ms',
            latencyMax: '187.90ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'ap-northeast-2',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '140.61ms',
            latencyStdev: '37.89ms',
            latencyMax: '251.01ms',
            latencyStdevPerc: 90,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'ap-southeast-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '212.34ms',
            latencyStdev: '58.84ms',
            latencyMax: '332.29ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'ap-southeast-2',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '196.74ms',
            latencyStdev: '55.08ms',
            latencyMax: '317.18ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'ap-south-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '2.54KB',
            requestsPerSec: 6.98,
            requestsTotal: 14,
            durationActual: '2.01s',
            transferTotal: '5.10KB',
            latencyAvg: '586.39ms',
            latencyStdev: '74.65ms',
            latencyMax: '702.46ms',
            latencyStdevPerc: 57.14,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        },
        {
          region: 'sa-east-1',
          config: { args: [Array] },
          result: {
            transferPerSec: '3.63KB',
            requestsPerSec: 9.97,
            requestsTotal: 20,
            durationActual: '2.01s',
            transferTotal: '7.29KB',
            latencyAvg: '229.01ms',
            latencyStdev: '61.07ms',
            latencyMax: '341.25ms',
            latencyStdevPerc: 80,
            rpsAvg: '-nan',
            rpsStdev: '-nan',
            rpsMax: '0.00',
            rpsStdevPerc: 0
          }
        }
      ],
      
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
