async function insertData() {
  var ethereum_address = document.querySelector("#eth_address").value;
  var frenchise_location = document.querySelector("#location").value;
  var unique_id = document.querySelector("#unique_id").value;

  console.log("ethereum address =" + ethereum_address + "franchise location =" + frenchise_location);

  try {
    const result = await nft_contract.methods.addNewDealer(unique_id, ethereum_address, frenchise_location)
      .send({ from: myaccount[0] });
    showresult(result);
  } catch (error) {
    console.log(error);
    
    if (error && error.message) {
      showerror(error.message); // Display error message
    } else {
      showerror("Transaction failed."); // Display a generic error message
    }
  }
}

function showresult(result) {
  const messagebox = document.querySelector("#message");

    messagebox.textContent = "Transaction successful! Transaction hash: " + result.transactionHash;
  
}
function showerror(err)
{ const messagebox = document.querySelector("#message");
  messagebox.textContent = "Transaction failed. Error message: "+ err;
}

function loadPage() {
  $("#account").val(myaccount[0]);
  console.log("test the king");
}

const submit_btn = document.querySelector('#submit');
submit_btn.addEventListener("click", insertData);
