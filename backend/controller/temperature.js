require('dotenv').config();
const ethers = require('ethers'),
    fs = require('fs'),
    abi = require('../abis/abi.json');

const encryptedKey = fs.readFileSync("./.encryptKey.json", "utf8");
const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);


exports.updateTemperature = async (req, res) => {

    const {temp, hum} = req.body;

    try {

        let wallet = await ethers.Wallet.fromEncryptedJson(encryptedKey, process.env.PRIVATE_KEY_PASSWORD);

        wallet = wallet.connect(provider);

        // get smart contract instance with ethers
        const contract =  new ethers.Contract(process.env.IOT_CONTRACT_BASE, abi, wallet);

        // make call to contract to create event
        const transaction = await contract.updateSensorData(temp, hum);
        // await reciept
        const reciept = await transaction.wait()

        res.json({message: "succcess", data: reciept});
        
    } catch (error) {
        return res.status(400).json({error: error, message: error.message});
    }
}


module.exports = exports;