const axios = require("axios");

const cookie = `your_cookie`;

async function sendRequest(amount) {
    const response = await axios({
        method: 'post',
        url: "https://stake.com/_api/graphql",
        headers: {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "content-type": "application/json",
            "cookie": cookie,
            "origin": "https://stake.com",
            "priority": "u=1, i",
            "referer": "https://stake.com/casino/games/dice",
            "sec-ch-ua": `"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": "",
            "sec-ch-ua-platform": "macOS",
            "sec-ch-ua-platform-version": "12.6.2",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            "x-access-token": "b6b7f4eff2942bf84c9f910d3070fd935ed16b15ba78fd44a0041312d5090e4d7fe66ce1e8c29b592516fb5c9c765c42",
            "x-lockdown-token": "s5MNWtjTM5TvCMkAzxov"
        },
        data: `{"query":"mutation DiceRoll($amount: Float!, $target: Float!, $condition: CasinoGameDiceConditionEnum!, $currency: CurrencyEnum!, $identifier: String!) {\\n  diceRoll(\\n    amount: $amount\\n    target: $target\\n    condition: $condition\\n    currency: $currency\\n    identifier: $identifier\\n  ) {\\n    ...CasinoBet\\n    state {\\n      ...CasinoGameDice\\n    }\\n  }\\n}\\n\\nfragment CasinoBet on CasinoBet {\\n  id\\n  active\\n  payoutMultiplier\\n  amountMultiplier\\n  amount\\n  payout\\n  updatedAt\\n  currency\\n  game\\n  user {\\n    id\\n    name\\n  }\\n}\\n\\nfragment CasinoGameDice on CasinoGameDice {\\n  result\\n  target\\n  condition\\n}\\n","variables":{"target":50.5,"condition":"above","identifier":"uix6CkiHQqTnDNYHZXt8T","amount":` + amount + `,"currency":"usdt"}}`
    });

    return response.data.data

}
const Default_amount = 0.1;
async function main(){
    let amount =Default_amount;
    while(1){
        const response = await sendRequest(amount);
        if(response.diceRoll.state.result < 50.5){
            console.log("Won")
            amount = Default_amount;
        }else{
            amount = amount*2;
            console.log("Loss")

        }
        await new Promise(resolve => settimeout(resolve,1000))
    }

}