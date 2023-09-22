const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', async () => {
    try {
        const provider = await detectEthereumProvider();

        if (provider) {
            // Metamask is installed and enabled
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            console.log(accounts); // prints the user's Ethereum address to the console
            // Redirect to the main app page, or do other login-related tasks
            window.location.href = "/home";

        } else {
            alert('Please install Metamask to use this feature');
        }
    } catch (error) {
        console.error(error);
    }
});
