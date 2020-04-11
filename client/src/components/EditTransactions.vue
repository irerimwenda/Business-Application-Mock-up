<template>
    <div>
        <v-btn
            bottom
            color="pink"
            dark
            fab
            fixed
            right
            @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
        </v-btn>

    <v-dialog
      v-model="dialog"
      width="800px">
      <v-card>

        <v-card-title class="grey lighten-4 py-4 title">
          New transaction
        </v-card-title>

        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
              <v-flex xs12>
                  <v-menu
                    ref="datePicker"
                    lazy
                    :close-on-content-click="false"
                    v-model="transactionDatePicker"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px">

                  <v-text-field
                    slot="activator"
                    label="Select Transaction Date"
                    v-model="transaction.transactionDate"
                    prepend-icon="mdi-calendar"
                    readonly>
                   </v-text-field>

                   <v-date-picker
                    v-model="transaction.transactionDate"
                    v-on:input="$refs.datePicker.save(transaction.transactionDate)">
                   </v-date-picker>

                  </v-menu>
              </v-flex>

                <v-flex xs12>
                    <v-select
                    prepend-icon="mdi-credit-card"
                    v-bind:items="transactionTypes"
                    v-model="transaction.transactionType"
                    label="Transaction Type"
                    single-line
                    bottom>
                    </v-select>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        prepend-icon="mdi-pen"
                        placeholder="Description"
                        v-model="transaction.description">
                    </v-text-field>
                </v-flex>

                <v-flex xs6>
                    <v-text-field
                        prepend-icon="mdi-minus-circle"
                        placeholder="Charge (-)"
                        v-model="transaction.charge">
                    </v-text-field>
                </v-flex>

                <v-flex xs6>
                    <v-text-field
                        prepend-icon="mdi-plus-circle"
                        placeholder="Deposit (+)"
                        v-model="transaction.deposit">
                    </v-text-field>
                </v-flex>

                <v-flex>
                    <v-text-field
                        prepend-icon="mdi-note"
                        placeholder="Notes"
                        v-model="transaction.notes">
                    </v-text-field>
                </v-flex>
          </v-layout>
        </v-container>

        <v-card-actions>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
            >Cancel
          </v-btn>

          <v-btn
            text
            @click="saveTransaction"
            >Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    name: 'EditTransaction',
    data: () => ({
        dialog: false,
        transaction: {
            id: null,
            transactionDate: null,
            transactionType: null,
            description: '',
            notes: '',
            charge: 0.0,
            deposit: 0.0
        },
        transactionTypes: [
            { text: 'Credit Card', value: 'Credit Card' },
            { text: 'Debit Card', value: 'Debit Card' },
            { text: 'Check', value: 'Check' },
            { text: 'Deposit', value: 'Deposit' },
        ],
        transactionDatePicker: false
    }),

    methods: {
        saveTransaction() {
            console.log('Saving transaction record: ')

            // TODO: Setup Vuex action

            this.dialog = false
        },
        showEditTransactionDialog() {
            this.transaction.transactionDate = this.getCurrentDate()
            this.dialog = true
        },
        getCurrentDate() {
            const dt = new Date(Date.now())
            let month = '' + (dt.getMonth() + 1)
            let day = '' + dt.getDate()
            let year = dt.getFullYear()

            if(month.length < 2) month = '0' + month
            if(day.length < 2) day = '0' + day

            return [year, month, day].join('-')
        }
    }
}
</script>
