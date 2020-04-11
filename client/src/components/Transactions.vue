<template>
    <v-card style="width: 100%">
        <v-card-title>
            <span class="pr-3">
                Transactions for {{months[currentMonth].name}} - {{currentYear}}
            </span>
            <v-btn flat icon class="pr-2" v-on:click="gotoMonth(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-btn flat icon class="pr-2" v-on:click="gotoCurrentMonth">
                <v-icon>mdi-calendar-today</v-icon>
            </v-btn>

            <v-btn flat icon v-on:click="gotoMonth(1)">
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-text-field
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="hidden-sm-and-down"
                v-model="search">
            </v-text-field>
        </v-card-title>

         <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            item-key="_id"
            >
            <template slot="items" slot-scope="props">
                <tr>
                    <td>
                        <v-edit-dialog
                        lazy>
                            {{props.item.transactionDate}}
                            <v-text-field
                            slot="input"
                            label="Edit"
                            v-model="props.item.transactionDate"
                            single-line>
                            </v-text-field>
                        </v-edit-dialog>
                    </td>
                    
                    <td class="text-xs-left">{{ props.item.transactionType }}</td>
                    <td class="text-xs-left" @click="props.expanded = !props.expanded">
                        {{ props.item.description }}
                    </td>
                    <td class="text-xs-left">{{ props.item.charge }}</td>
                    <td class="text-xs-left">{{ props.item.deposit }}</td>
                    <td class="text-xs-left">{{ props.item.balance }}</td>
                </tr>
            </template>

            <template slot="expand" slot-scope="props">
                <v-card flat class="pl-5">
                    <v-card-text class="text-xs-left">
                        <v-text-field label="Note" v-model="props.item.notes"></v-text-field>
                    </v-card-text>
                </v-card>
            </template>

            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>
        </v-data-table>

    </v-card>
</template>

<style scoped>

</style>

<script>
export default {
    data() {
        return {
            months: [
                { name: 'Zero', abrev: 'ZZZ', index: 0 },
                { name: 'January', abrev: 'Jan', index: 1 },
                { name: 'February', abrev: 'Feb', index: 2 },
                { name: 'March', abrev: 'Mar', index: 3 },
                { name: 'April', abrev: 'Apr', index: 4 },
                { name: 'May', abrev: 'May', index: 5 },
                { name: 'June', abrev: 'Jun', index: 6 },
                { name: 'July', abrev: 'Jul', index: 7 },
                { name: 'August', abrev: 'Aug', index: 8 },
                { name: 'September', abrev: 'Sep', index: 9 },
                { name: 'October', abrev: 'Oct', index: 10 },
                { name: 'November', abrev: 'Nov', index: 11 },
                { name: 'December', abrev: 'Dec', index: 12 },
            ],
            currentMonth: 4,
            currentYear: 2020,
            balanceCharges: 0,
            balanceDeposits: 0,
            max25chars: (v) => v.length <= 25 || 'Input too long',
            search: '',
            pagination: {},
            headers: [
                { text: 'Date', align: 'center', sortable: false, value: 'date'},
                { text: 'Type', align: 'center', sortable: false, value: 'type'},
                { text: 'Description', align: 'center', sortable: false, value: 'description'},
                { text: 'Charge (-)', align: 'center', sortable: false, value: 'paymentAmt'},
                { text: 'Deposit (+)', align: 'center', sortable: false, value: 'depositAmt'},
                { text: 'Balance', align: 'center', sortable: false, value: 'balance'},
            ],
            items: [
                {

                }
            ]
        }
    }
}
</script>
