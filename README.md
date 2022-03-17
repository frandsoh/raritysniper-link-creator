# CryptoBurbs RaritySniper Link Builder


## Setup

### 1. API Key

You need an API key from PolygonScan to use this tool.

Get one for free here: [https://polygonscan.com/apis](https://polygonscan.com/apis)

Add the api key to a `.env` file in the root directory.

Should look like this 

```sh
# inside .env file
API_KEY="<YOUR API KEY HERE>"
```

### 2. npm install

Run `npm install`

### 3. Run the script

Get your public wallet address ready

Should look something like `0xe99D360A3f00cE3E27713b643c508b04489843Fb`

**Important:** Make sure the format of the address is the same as it's shown on polygonscan. 
(Notice the mixture of small and capital letters in the wallet address above)

Inside the root dir run the command `node index <YOUR-WALLET-ADDRESS>`

This will output a link in your terminal if everything went smooth.

You can pipe it to e.g. `pbcopy` (on OSX) to make the link avaiable in your clipboard

Example: `node index 0xe99D360A3f00cE3E27713b643c508b04489843Fb | pbcopy` then go to your browser and paste in the link.
