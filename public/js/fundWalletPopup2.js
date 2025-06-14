//To load environment variables from a .env file into process.env
//const dotenv = require('dotenv');
//dotenv.config();

const paystackInstance = new PaystackPop();

    const onSuccess = (transaction) => {
      console.log('Successful transaction:', transaction);
      alert(`Successful! Ref: ${transaction.reference}`);
    };

    const onClose = () => {
      console.log('Transaction closed.');
    };

    document.getElementById('fundButton').addEventListener('click', () => {
      paystackInstance.newTransaction({
        key: 'pk_test_5cc6223594aa9a8dc29e8b6574b6efba0aa79e72',
        email: 'dot1@example.com',
        amount: 10000,
        onSuccess: onSuccess,
        onClose: onClose
      });
      paystackInstance.openIframe();
    });