function fundWalletPopup() {
    let number;
    let amount = prompt("Please enter the amount:", 100);
    if (amount == null || amount == "") {
      number = "User cancelled the process.";
    } else {
      number = amount;
      console.log(number)
      console.log(amount)
    }
  }