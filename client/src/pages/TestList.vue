<template>
  <div>
    <div id="new-test-form">
    <md-button @click='toggle = !toggle' v-show='!toggle' id="formbutton"> Create new test</md-button>

    <div v-show='toggle' id="form">

       <div class="content">
    <div class="md-layout">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
    </div>
  </div>

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
import { EditProfileForm, UserCard } from "@/pages";
import { OrderedTable } from "@/components";

export default {
  components: {
    EditProfileForm,
    OrderedTable
  },
  data() { return{
    toggle: false,
    model: {
    }
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