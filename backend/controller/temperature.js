require('dotenv').config();
const ethers = require('ethers'),
    fs = require('fs'),
    abi = require('../abis/abi.json');

const encryptedKey = fs.readFileSync("./.encryptKey.json", "utf8");
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/ee5d4276d00a426192590cc641bb1cf6");


exports.updateTemperature = async (req, res) => {

    const {temp} = req.body;

    try {

        let wallet = await ethers.Wallet.fromEncryptedJson(encryptedKey, process.env.PRIVATE_KEY_PASSWORD);

        wallet = wallet.connect(provider);

        // get smart contract instance with ethers
        const contract =  new ethers.Contract(process.env.IOT_CONTRACT, abi, wallet);

        // make call to contract to create event
        const transaction = await contract.updateTemperature(temp);
        // await reciept
        const reciept = await transaction.wait()

        res.json({message: "succcess", data: reciept});
        
    } catch (error) {
        return res.status(400).json({error: error, message: error.message});
    }
}


module.exports = exports;