<template>
<div class="section">
    <div class="container ">
        <h1 class="title ">
            Car On Rent
        </h1>
        <p class="subtitle">
            Drive when you want !!
        </p>
        <div class="column is-half is-offset-3">
            <form action="" class="form ">
                <b-field label="Name">
                    <b-input v-model="name"></b-input>
                </b-field>
                <b-field label="Email">
                    <b-input type="email" placeholder="Enter email"></b-input>
                </b-field>
                <b-field grouped>
                    <b-field label="Contact" expanded>
                        <b-field>
                            <b-select v-model="ext" placeholder="Ext.">
                                <option selected value="+91">+91</option>
                                <option value="+44">+44</option>
                                <option value="+11">+11</option>
                            </b-select>
                            <b-input type="text" pattern="[0-9]*" v-model="contact"
                                validation-message=" Enter Numbers Only" placeholder="Enter Contact" expanded>
                            </b-input>
                        </b-field>
                    </b-field>
                </b-field>
                <b-field label="Rent For" expanded></b-field>
                <b-field>
                    <b-radio-button v-model="rentday" native-value="one">
                        <b-icon icon="calendar-today" size="is-small" type="is-success"> </b-icon>
                        <span>One Day</span>
                    </b-radio-button>
                    <b-radio-button v-model="rentday" native-value="multiple">
                        <span>Multiple Day</span>
                    </b-radio-button>
                </b-field>
                <b-field label="Car Group">
                    <b-select placeholder="Select car group" expanded>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="XUV">XUV</option>
                    </b-select>
                </b-field>
                <b-field label="Car ">
                    <b-select placeholder="Select car " expanded>
                        <option value="Hatchback">Maruti Swift AT </option>
                        <option value="Hatchback">Tata Tiago </option>
                        <option value="Sedan">Hyundai Verna</option>
                        <option value="SUV">Ford Ecosport </option>
                        <option value="XUV">Audi Q3</option>
                    </b-select>
                </b-field>
                <b-field label="Select Date" v-if="rentday=='multiple'">
                    <b-datepicker placeholder="Select Date" v-model="dates" range></b-datepicker>
                </b-field>
                <b-field label="Select Date" v-else-if="rentday=='one'">
                    <b-datepicker placeholder="Select Date" v-model="date"></b-datepicker>
                </b-field>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "RentForm",
  data () {
      return {
            name: '',
            contact: '',
            ext: null,
            rentday: 'one',
            dates: [],
            date: null
        }
    }
};
</script>
