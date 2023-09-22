async function insertData() {
    var eth_address = document.querySelector("#eth_address").value;
    var society_name = document.querySelector("#society_name").value;
    var plot_phase = document.querySelector("#plot_phase").value;
    var Street_no = document.querySelector("#Street_no").value;
    var Plot_no = document.querySelector("#Plot_no").value;
    var Registry_no = document.querySelector("#Registry_no").value;
    var property_area = document.querySelector("#property_area").value;
    var gps_location = document.querySelector("#gps_location").value;
    var Property_nature = document.querySelector("#Property_nature").value;
    
  var pick = " Immutable real estate system thanks";
   
    try {
      const result = await nft_contract.methods.createNFT(eth_address,society_name, plot_phase,Street_no,Plot_no,Registry_no,property_area,gps_location,Property_nature,pick)
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
  