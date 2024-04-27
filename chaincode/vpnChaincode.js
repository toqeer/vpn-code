'use strict';

const { Contract } = require('fabric-contract-api');

class VpnTransactions extends Contract {

    // Initialize the ledger with some transactions (optional)
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const transactions = [
            {
                id: 'txn1',
                vpnData: 'Data1',
                timestamp: new Date(),
                status: 'Processed'
            },
            {
                id: 'txn2',
                vpnData: 'Data2',
                timestamp: new Date(),
                status: 'Failed'
            },
        ];

        for (let i = 0; i < transactions.length; i++) {
            transactions[i].docType = 'transaction';
            await ctx.stub.putState('TXN' + i, Buffer.from(JSON.stringify(transactions[i])));
            console.info('Added <--> ', transactions[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    // Add a new VPN transaction
    async createTransaction(ctx, txnId, vpnData) {
        console.info('============= START : Create Transaction ===========');

        const transaction = {
            docType: 'transaction',
            id: txnId,
            vpnData,
            timestamp: new Date(),
            status: 'New'
        };

        await ctx.stub.putState(txnId, Buffer.from(JSON.stringify(transaction)));
        console.info('============= END : Create Transaction ===========');
    }

    // Query a transaction by ID
    async queryTransaction(ctx, txnId) {
        const transactionAsBytes = await ctx.stub.getState(txnId); // get the transaction from chain
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`${txnId} does not exist`);
        }
        console.log(transactionAsBytes.toString());
        return transactionAsBytes.toString();
    }

    // Update a transaction's status
    async updateTransaction(ctx, txnId, newStatus) {
        console.info('============= START : Update Transaction ===========');

        const transactionAsBytes = await ctx.stub.getState(txnId);
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`${txnId} does not exist`);
        }
        const transaction = JSON.parse(transactionAsBytes.toString());
        transaction.status = newStatus;

        await ctx.stub.putState(txnId, Buffer.from(JSON.stringify(transaction)));
        console.info('============= END : Update Transaction ===========');
    }
}

module.exports = VpnTransactions;
