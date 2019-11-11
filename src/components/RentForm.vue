<template>
  <div class="section">
    <div class="container">
      <h1 class="title">Car On Rent</h1>
      <p class="subtitle">Drive when you want !!</p>
      <div class="column is-half is-offset-3">
        <form action class="form" @submit.prevent="submitForm">
          <b-field
            label="Name"
            :type="{'is-danger': errors.first('name')}"
            :message="errors.first('name')?'Enter full name':''"
          >
            <b-input v-model="name" v-validate="'required'" name="name" placeholder="Enter Name"></b-input>
          </b-field>
          <b-field
            label="Email"
            :type="{'is-danger':errors.first('email')}"
            :message="errors.first('email')?'Enter email address ':''"
          >
            <b-input type="email" placeholder="Enter email" v-validate="'required'" name="email"></b-input>
          </b-field>
          <b-field grouped>
            <b-field label="Contact" expanded>
              <b-field
                :type="{'is-danger':errors.first('contact')}"
                :message="errors.first('contact')?'Enter contact number ':''"
              >
                <b-select v-model="ext" placeholder="Ext.">
                  <option v-for="data in contacts" :key="data.id" :value="data.value">{{data.value}}</option>
                </b-select>
                <b-input
                  type="text"
                  pattern="[0-9]*"
                  v-model="contact"
                  placeholder="Enter Contact"
                  expanded
                  v-validate="'required'"
                  name="contact"
                ></b-input>
              </b-field>
            </b-field>
          </b-field>
          <b-field label="Rent For" expanded></b-field>
          <b-field>
            <b-radio-button v-model="rentday" native-value="one" icon="magnify">
              <b-icon icon="calendar-today"></b-icon>
              <span>One Day</span>
            </b-radio-button>
            <b-radio-button v-model="rentday" native-value="multiple">
              <b-icon icon="calendar-range"></b-icon>
              <span>Multiple Day</span>
            </b-radio-button>
          </b-field>
          <b-field
            label="Car Type"
            :type="{'is-danger':errors.first('carType')}"
            :message="errors.first('carType')?'Select car type ':''"
          >
            <b-select
              placeholder="Select car type"
              expanded
              v-model="carType"
              name="carType"
              v-validate="'required'"
            >
              <option v-for="data in carTypes" :key="data.id" :value="data.value">{{data.value}}</option>
            </b-select>
          </b-field>
          <b-field
            label="Car"
            :type="{'is-danger':errors.first('car')}"
            :message="errors.first('car')?'Select car  ':''"
          >
            <b-select
              placeholder="Select car "
              expanded
              v-model="car"
              name="car"
              v-validate="'required'"
            >
              <template v-if="carType">
                <template v-for="item in cars">
                  <option
                    v-if="item.type==carType"
                    :key="item.id"
                    :value="item.value"
                  >{{item.value}}</option>
                </template>
              </template>
              <template v-else-if="!carType">
                <option></option>
              </template>
            </b-select>
          </b-field>
          <div class="columns">
            <b-field class="column is-6" v-if="rent">Per day rent : &#36;{{rent}}</b-field>
            <b-field class="column is-6 label" v-if="total">Total : &#36;{{total}}</b-field>
          </div>
          <b-field
            label="Select Date"
            v-if="rentday=='multiple'"
            :type="{'is-danger':errors.first('dates')}"
            :message="errors.first('dates')?'Select date range  ':''"
          >
            <b-datepicker
              placeholder="Select Date"
              v-model="dates"
              range
              v-validate="'required'"
              name="dates"
            ></b-datepicker>
          </b-field>
          <b-field
            label="Select Date"
            v-else-if="rentday=='one'"
            :type="{'is-danger':errors.first('date')}"
            :message="errors.first('date')?'Select date  ':''"
          >
            <b-datepicker
              placeholder="Select Date"
              v-model="date"
              v-validate="'required'"
              name="date"
            ></b-datepicker>
          </b-field>
          <b-button native-type="submit" class="is-primary">submit</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RentForm",
  data() {
    return {
      name: "",
      contact: "",
      ext: null,
      rentday: "one",
      dates: [],
      date: null,
      carType: null,
      car: null,
      rent: null,
      total: 0,
      contacts: [{ value: "+91" }, { value: "+44" }, { value: "+40" }],
      carTypes: [
        { value: "Hatchback" },
        { value: "Sedan" },
        { value: "SUV" },
        { value: "XUV" }
      ],
      cars: [
        { type: "Hatchback", value: "Maruti Swift AT", perday: 1000 },
        { type: "Hatchback", value: "Tata Tiago", perday: 1800 },
        { type: "Sedan", value: "Hyundai Verna", perday: 2100 },
        { type: "SUV", value: "Ford Ecosport", perday: 2500 },
        { type: "XUV", value: "Audi Q3", perday: 3000 }
      ]
    };
  },
  watch: {
    carType: function() {
      this.rent = null;
      this.total = 0;
      this.dates = null;
      this.date = null;
    },
    car: function(val) {
      let car = this.cars.find(item => item.value === val);
      this.rent = car.perday;
      this.total = this.rent;
      if (this.dates) {
        this.dates = null;
      } else if (this.date) {
        this.date = null;
      }
    },
    dates: function(val) {
      if (val) {
        var date1 = new Date(val[0]);
        var date2 = new Date(val[1]);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        this.calculateTotal(Difference_In_Days + 1);
      }
    },
    date: function(val) {
      if (val) {
        this.calculateTotal(1);
      }
    },
    rentday: function() {
      this.total = 0;
      this.dates = this.date = null;
    }
  },
  methods: {
    calculateTotal(days) {
      let car = this.cars.find(item => item.value === this.car);
      this.total = days * car.perday;
    },
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$buefy.toast.open({
            message: "Form is valid!",
            type: "is-success",
            position: "is-bottom"
          });
          return;
        }
        this.$buefy.toast.open({
          message: " Please check the fields ! Fill all required fields.",
          type: "is-danger",
          position: "is-top-right"
        });
      });
    }
  }
};
</script>
